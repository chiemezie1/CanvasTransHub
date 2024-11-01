// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CanvasTrans {

    enum MediaType { Text, Image, Video }

    // Structure for a Canvas Transaction
    struct CanvasTransItem {
        uint256 id;
        string ipfsHash;
        string title;
        string description;
        MediaType mediaType;
        address creator;
        uint256 transBlock;
        uint256 likes;
        uint256 timestamp;
        uint256 totalDonations;
    }

    // Structure for a User Profile
    struct UserProfile {
        string username;
        string bio;
        string profilePicture;
        address[] followers;
        address[] following;
    }

    // Structure for a Block (formerly Collection)
    struct Block {
        uint256 id;
        string name;
        string description;
        string category;
        address owner;
        uint256[] transactionIds;
    }

    // Structure for Comments
    struct Comment {
        address commenter;
        string text;
        uint256 timestamp;
    }

    // State variables
    address public admin;
    uint256 public transactionCounter;
    uint256 public blockCounter;
    uint256 totalCreatorAmount = 0;


    mapping(uint256 => CanvasTransItem) public transactions; // Mapping of transaction IDs to CanvasTransItem structs
    mapping(uint256 => Block) public blocks; // Mapping of block IDs to Block structs
    mapping(address => uint256[]) public userBlocks; // Mapping of user address to their block IDs
    mapping(address => uint256[]) public userTransactions; // Mapping of user address to their transaction IDs
    mapping(address => UserProfile) public userProfiles; // Mapping of user address to their profiles
    mapping(uint256 => mapping(address => bool)) public transactionLikes; // Mapping to check if a user has liked a transaction
    mapping(uint256 => Comment[]) public transactionComments; // Mapping of transaction IDs to comments
    mapping(uint256 => mapping(address => uint256)) public donations; // Mapping of donations to a transaction by address
    mapping(uint256 => address[]) public transactionDonors;

    // Events
    event TransactionCreated(uint256 transactionId, address indexed creator);
    event BlockCreated(uint256 blockId, address indexed owner);
    event TransactionAddedToBlock(uint256 transactionId, uint256 blockId, address indexed owner);
    event ProfileUpdated(address indexed user, string username, string bio, string profilePicture);
    event TransactionLiked(uint256 indexed transactionId, address indexed liker);
    event Followed(address indexed user, address indexed follower);
    event CommentAdded(uint256 indexed transactionId, address indexed commenter, string text);
    event DonationMade(uint256 indexed transactionId, address indexed donor, uint256 amount);
    event DonationsWithdrawn(address indexed creator, uint256 amount);
    event BlockDetailsUpdated(uint256 indexed blockId, string newName, string newDescription);

    // Constructor to set the initial admin
    constructor() {
        admin = msg.sender;
    }

    receive() external payable {
        // Receive function to handle incoming ETH.
    }
    
    // Modifier to restrict functions to the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action");
        _;
    }

    // Modifier to restrict functions to the block owners
    modifier onlyBlockOwner(uint256 _blockId) {
        require(blocks[_blockId].owner == msg.sender, "Only the block owner can add transactions");
        _;
    }

    // Function to create a new Canvas Transaction
    function createTransaction(string memory _ipfsHash, string memory _title, string memory _description, MediaType _mediaType) external {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");

        transactionCounter++;
        transactions[transactionCounter] = CanvasTransItem({
            id: transactionCounter,
            ipfsHash: _ipfsHash,
            title: _title,
            description: _description,
            mediaType: _mediaType,
            creator: msg.sender,
            transBlock: 0,
            likes: 0,
            timestamp: block.timestamp,
            totalDonations: 0
        });

        userTransactions[msg.sender].push(transactionCounter);

        emit TransactionCreated(transactionCounter, msg.sender);
    }

    // Function to create a new Block
    function createBlock(string memory _name, string memory _description, string memory _category) external {
        blockCounter++;
        blocks[blockCounter] = Block({
            id: blockCounter,
            name: _name,
            description: _description,
            owner: msg.sender,
            transactionIds: new uint256[](0),
            category: _category 
        });

        userBlocks[msg.sender].push(blockCounter);

        emit BlockCreated(blockCounter, msg.sender);
    }

    // Function to add a transaction to a block
    function addTransactionToBlock(uint256 _blockId, uint256 _transactionId) external onlyBlockOwner(_blockId) {
        require(transactions[_transactionId].creator != address(0), "Transaction does not exist");
        require(transactions[_transactionId].transBlock == 0, "Transaction already assigned to a block");
         blocks[_blockId].transactionIds.push(_transactionId);
        
        transactions[_transactionId].transBlock = _blockId;

        emit TransactionAddedToBlock(_transactionId, _blockId, msg.sender);
    }

    // Function to get all blocks
    function getAllBlocks() external view returns (Block[] memory) {
        Block[] memory allBlocks = new Block[](blockCounter);
        for (uint256 i = 1; i <= blockCounter; i++) {
            allBlocks[i - 1] = blocks[i];
        }
        return allBlocks;
    }

    // Function to update the admin address
    function updateAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0), "Invalid admin address");
        admin = _newAdmin;
    }

    // Function to update the user's profile
    function updateProfile(string memory _username, string memory _bio, string memory _profilePicture) external {
        require(bytes(_username).length > 0, "Username cannot be empty");

        UserProfile storage profile = userProfiles[msg.sender];
        profile.username = _username;
        profile.bio = _bio;
        profile.profilePicture = _profilePicture;

        emit ProfileUpdated(msg.sender, _username, _bio, _profilePicture);

    }
    
    // Function to like a Canvas Transaction
    function likeTransaction(uint256 _transactionId) external {
        require(transactions[_transactionId].creator != address(0), "Transaction does not exist");
        require(!transactionLikes[_transactionId][msg.sender], "You have already liked this transaction");

        transactions[_transactionId].likes++;
        transactionLikes[_transactionId][msg.sender] = true;

        emit TransactionLiked(_transactionId, msg.sender);
    }

    // Follow another user
    function followUser(address _userToFollow) external {
        require(_userToFollow != msg.sender, "You cannot follow yourself");
        require(!isFollowing(msg.sender, _userToFollow), "You are already following this user");

        userProfiles[msg.sender].following.push(_userToFollow);
        userProfiles[_userToFollow].followers.push(msg.sender);

        emit Followed(msg.sender, _userToFollow);
    }

    // Function to add a comment to a Canvas Transaction
    function addComment(uint256 _transactionId, string memory _text) external {
        require(transactions[_transactionId].creator != address(0), "Transaction does not exist");

        transactionComments[_transactionId].push(Comment({
            commenter: msg.sender,
            text: _text,
            timestamp: block.timestamp
        }));

        emit CommentAdded(_transactionId, msg.sender, _text);
    }

    function deleteComment(uint256 _transactionId, uint256 _commentIndex) external {
        require(_commentIndex < transactionComments[_transactionId].length, "Invalid comment index");
        Comment storage comment = transactionComments[_transactionId][_commentIndex];
        require(comment.commenter == msg.sender || transactions[_transactionId].creator == msg.sender, "Not authorized to delete this comment");

        transactionComments[_transactionId][_commentIndex] = transactionComments[_transactionId][transactionComments[_transactionId].length - 1];
        transactionComments[_transactionId].pop();
    }

    // Function to donate to a Canvas Transaction
    function donateToTransaction(uint256 _transactionId) external payable {
        require(transactions[_transactionId].creator != address(0), "Transaction does not exist");
        require(msg.value > 0, "Donation must be greater than 0");

        // If the donor has not donated before, add them to the list
        if (donations[_transactionId][msg.sender] == 0) {
            transactionDonors[_transactionId].push(msg.sender);
        }

        donations[_transactionId][msg.sender] += msg.value;
        transactions[_transactionId].totalDonations += msg.value;

        emit DonationMade(_transactionId, msg.sender, msg.value);
    }

    // Function to withdraw donations for a creator (95% to creator, 5% for admin)
    function withdrawDonations(uint256 _transactionId) external {
        CanvasTransItem storage item = transactions[_transactionId];
        require(item.creator == msg.sender, "Only the creator can withdraw donations");
        require(item.totalDonations > 0, "No donations available for withdrawal");

        uint256 totalDonations = item.totalDonations;
        uint256 creatorAmount = (totalDonations * 95) / 100; // 95% to creator

        item.totalDonations = 0;

        // Transfer 95% to the creator
        (bool successCreator, ) = payable(msg.sender).call{value: creatorAmount}("");
        require(successCreator, "Transfer to creator failed");

        emit DonationsWithdrawn(msg.sender, creatorAmount);
    }

    // Admin function to withdraw all remaining admin funds
    function withdrawAdminFunds() external onlyAdmin {
        uint256 adminBalance = address(this).balance;
        require(adminBalance > 0, "No funds available for admin withdrawal");

        (bool success, ) = payable(admin).call{value: adminBalance}("");
        require(success, "Admin withdrawal failed");
    }

    // Create a function to return both addresses and donation amounts for a transaction
    function getDonorsAndDonations(uint256 _transactionId) external view returns (address[] memory, uint256[] memory) {
        require(transactions[_transactionId].creator != address(0), "Transaction does not exist");

        address[] memory donors = transactionDonors[_transactionId];
        uint256[] memory donationAmounts = new uint256[](donors.length);

        // Populate the donation amounts
        for (uint256 i = 0; i < donors.length; i++) {
            donationAmounts[i] = donations[_transactionId][donors[i]];
        }

        return (donors, donationAmounts);
    }

    // Fetch user transactions
       // Function to get the full details of all transactions associated with a user
    function getUserTransactions(address _user) external view returns (CanvasTransItem[] memory) {
        uint256[] memory transactionIds = userTransactions[_user];
        CanvasTransItem[] memory userTransactionDetails = new CanvasTransItem[](transactionIds.length);

        for (uint256 i = 0; i < transactionIds.length; i++) {
            userTransactionDetails[i] = transactions[transactionIds[i]];
        }

        return userTransactionDetails;
    }

    // Fetch a user's blocks
    function getUserBlocks(address _user) external view returns (Block[] memory) {
        uint256[] memory blockIds = userBlocks[_user];
        Block[] memory userBlockDetails = new Block[](blockIds.length);

        for (uint256 i = 0; i < blockIds.length; i++) {
            userBlockDetails[i] = blocks[blockIds[i]];
        }

        return userBlockDetails;
    }
 
    // Function to get all transactions
    function getPublicTransactions() external view returns (CanvasTransItem[] memory) {
        // Return all transactions as an array
        CanvasTransItem[] memory allTransactions = new CanvasTransItem[](transactionCounter);

        for (uint256 i = 1; i <= transactionCounter; i++) {
            allTransactions[i - 1] = transactions[i];
        }

        return allTransactions;
    }

    // Fetch followers of a user
    function getFollowers(address _user) external view returns (address[] memory) {
        return userProfiles[_user].followers;
    }

    // Fetch users being followed by a user
    function getFollowing(address _user) external view returns (address[] memory) {
        return userProfiles[_user].following;
    }

    // Fetch comments on a transaction
    function getTransactionComments(uint256 _transactionId) external view returns (Comment[] memory) {
        require(transactions[_transactionId].creator != address(0), "Transaction does not exist");
        return transactionComments[_transactionId];
    }

    // Helper function to check if one user is following another
    function isFollowing(address _follower, address _following) public view returns (bool) {
        address[] memory followingList = userProfiles[_follower].following;
        for (uint256 i = 0; i < followingList.length; i++) {
            if (followingList[i] == _following) {
                return true;
            }
        }
        return false;
    }
        // Function to get a Block with all its associated transactions
    function getBlockWithTransactions(uint256 _blockId) external view returns (Block memory, CanvasTransItem[] memory) {
        require(blocks[_blockId].owner != address(0), "Block does not exist");

        Block memory blockData = blocks[_blockId];
        uint256[] memory transactionIds = blockData.transactionIds;

        CanvasTransItem[] memory blockTransactions = new CanvasTransItem[](transactionIds.length);
        
        // Retrieve each transaction by ID and add it to the result array
        for (uint256 i = 0; i < transactionIds.length; i++) {
            blockTransactions[i] = transactions[transactionIds[i]];
        }

        return (blockData, blockTransactions);
    }

}
