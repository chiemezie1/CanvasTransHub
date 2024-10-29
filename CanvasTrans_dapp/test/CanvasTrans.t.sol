// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "forge-std/Test.sol";
import "../src/CanvasTrans.sol";

contract CanvasTransTest is Test {
    CanvasTrans canvasTrans;

    address admin;
    address user1;
    address user2;

    function setUp() public {
        // Set up accounts for testing
        admin = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        // Deploy the CanvasTrans contract
        canvasTrans = new CanvasTrans();
    }

    function testCreateTransaction() public {
        string memory ipfsHash = "QmT1...";
        string memory title = "Test Title";
        string memory description = "Test Description";
        CanvasTrans.MediaType mediaType = CanvasTrans.MediaType.Text;

        // User1 creates a transaction
        vm.prank(user1);
        canvasTrans.createTransaction(ipfsHash, title, description, mediaType);

        // Check that the transaction was created
        (uint256 returnedId, string memory returnedIpfsHash, string memory returnedTitle, string memory returnedDescription, CanvasTrans.MediaType returnedMediaType, address creator, , , ) = canvasTrans.transactions(1);
        assertEq(returnedId, 1); // Check the ID
        assertEq(returnedIpfsHash, ipfsHash);
        assertEq(returnedTitle, title);
        assertEq(returnedDescription, description);
        assertEq(uint(returnedMediaType), uint(mediaType));
        assertEq(creator, user1);
    }
    
    function testCreateBlock() public {
        string memory name = "Test Block";
        string memory description = "Block Description";
        string memory category = "Art";

        // User1 creates a block
        vm.prank(user1);
        canvasTrans.createBlock(name, description, category);

        // Check that the block was created
        (uint256 returnedId, string memory returnedName, string memory returnedDescription, string memory returnedCategory, address owner) = canvasTrans.blocks(1);
        assertEq(returnedId, 1);
        assertEq(returnedName, name);
        assertEq(returnedDescription, description);
        assertEq(returnedCategory, category);
        assertEq(owner, user1);
    }

    function testLikeTransaction() public {
        CanvasTrans.MediaType mediaType = CanvasTrans.MediaType.Text;

        // User1 creates a transaction
        vm.prank(user1);
        canvasTrans.createTransaction("QmT1...", "Test Title", "Test Description", mediaType);

        // User2 likes the transaction
        vm.prank(user2);
        canvasTrans.likeTransaction(1);

        // Check that the like was recorded
        ( , , , , , , uint256 likes, , ) = canvasTrans.transactions(1);
        assertEq(likes, 1);
    }

    function testFollowUser() public {
        // User1 creates a profile
        vm.prank(user1);
        canvasTrans.updateProfile("User1", "Bio1", "Picture1");

        // User2 follows User1
        vm.prank(user2);
        canvasTrans.followUser(user1);

        // Check that User2 follows User1
        address[] memory following = canvasTrans.getFollowing(user2);
        assertEq(following[0], user1);
    }

    function testUpdateProfile() public {
        // User1 updates their profile
        vm.prank(user1);
        canvasTrans.updateProfile("NewUser1", "NewBio1", "NewPicture1");

        // Check that the profile was updated
        (string memory username, string memory bio, string memory profilePicture) = canvasTrans.userProfiles(user1);
        assertEq(username, "NewUser1");
        assertEq(bio, "NewBio1");
        assertEq(profilePicture, "NewPicture1");
    }

    function testDonateToTransaction() public {
        CanvasTrans.MediaType mediaType = CanvasTrans.MediaType.Text;

        // User1 creates a transaction
        vm.prank(user1);
        canvasTrans.createTransaction("QmT1...", "Test Title", "Test Description", mediaType);

        // User2 donates to the transaction
        vm.prank(user2);
        vm.deal(user2, 1 ether);  // Give user2 some ETH
        canvasTrans.donateToTransaction{value: 0.5 ether}(1);

        // Check that the donation was recorded
        (, , , , , , , , uint256 totalDonations) = canvasTrans.transactions(1);
        assertEq(totalDonations, 0.5 ether);
    }
    
    function testWithdrawDonations() public {
        CanvasTrans.MediaType mediaType = CanvasTrans.MediaType.Text;

        // User1 creates a transaction
        vm.prank(user1);
        canvasTrans.createTransaction("QmT1...", "Test Title", "Test Description", mediaType);

        // User2 donates to the transaction
        vm.prank(user2);
        vm.deal(user2, 1 ether); // Give user2 some ETH
        canvasTrans.donateToTransaction{value: 1 ether}(1);

        // Check that the donation was recorded
        (, , , , , , , , uint256 totalDonationsBefore) = canvasTrans.transactions(1);
        assertEq(totalDonationsBefore, 1 ether);

        // Capture initial balances
        uint256 initialCreatorBalance = user1.balance;

        // User1 (the creator) withdraws donations
        vm.prank(user1);
        canvasTrans.withdrawDonations(1);

        // Calculate expected amounts
        uint256 expectedCreatorAmount = (1 ether * 95) / 100; // 95% to creator

        // Get actual balances after withdrawal
        uint256 finalCreatorBalance = user1.balance;

        // Assert the creator's balance increased by the expected amount
        assertEq(finalCreatorBalance, initialCreatorBalance + expectedCreatorAmount);

        // Ensure total donations reset to 0 after withdrawal
        (, , , , , , , , uint256 totalDonationsAfter) = canvasTrans.transactions(1);
        assertEq(totalDonationsAfter, 0);
    }
    
    function testAdminWithdrawalWithoutDonations() public {
        // Capture initial admin balance
        uint256 initialAdminBalance = admin.balance;

        // Admin attempts to withdraw funds without any donations
        vm.prank(admin);
        try canvasTrans.withdrawAdminFunds() {
            // Test should fail if this point is reached
            fail();
        } catch Error(string memory reason) {
            // Assert the expected error message
            assertEq(reason, "No funds available for admin withdrawal");
        }

        // Ensure admin balance remains unchanged
        uint256 finalAdminBalance = admin.balance;
        assertEq(finalAdminBalance, initialAdminBalance);
    }
}
