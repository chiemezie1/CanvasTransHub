import { readContract, writeContract, waitForTransactionReceipt } from "@wagmi/core";
import  config  from "../wagmi";
import { ABI, deployedAddress } from "./deployed-contract";

enum MediaType {
    Text = 0,
    Image = 1,
    Video = 2
}
interface TransactionResult<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

const handleContractError = (error: unknown): TransactionResult => {
    console.error("Contract error:", error);
    if (error instanceof Error) {
        if (error.message.includes("user rejected transaction")) {
            return { success: false, message: "Transaction was rejected by the user." };
        }
        if (error.message.includes("insufficient funds")) {
            return { success: false, message: "Insufficient funds to complete the transaction." };
        }
        // Add more specific error checks here based on your contract's error messages
        return { success: false, message: error.message };
    }
    return { success: false, message: "An unexpected error occurred." };
};

export const createTransaction = async (ipfsHash: string, title: string, description: string, mediaType: MediaType): Promise<TransactionResult> => {

    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "createTransaction",
            args: [ipfsHash, title, description, mediaType],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Transaction creation failed. Transaction reverted." };
        }
        return { success: true, message: "Transaction created successfully!", data: receipt };
    } catch (error) {
        return handleContractError(error);
    }
};

export const createBlock = async (_name: string, _description: string, _category: string): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "createBlock",
            args: [_name, _description, _category],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Block creation failed. Transaction reverted." };
        }
        return { success: true, message: "Block created successfully!", data: receipt };
    } catch (error) {
        return handleContractError(error);
    }
};

export const addTransactionToBlock = async (blockId: bigint, transactionId: bigint): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "addTransactionToBlock",
            args: [blockId, transactionId],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Adding transaction to block failed. Transaction reverted." };
        }
        return { success: true, message: "Transaction added to block successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const updateAdmin = async (_newAdmin: `0x${string}`): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "updateAdmin",
            args: [_newAdmin],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Updating admin failed. Transaction reverted." };
        }
        return { success: true, message: "Admin updated successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const updateProfile = async (username: string, bio: string, profilePicture: string): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "updateProfile",
            args: [username, bio, profilePicture],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Updating profile failed. Transaction reverted." };
        }
        return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const likeTransaction = async (_transactionId: bigint): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "likeTransaction",
            args: [_transactionId],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Liking transaction failed. Transaction reverted." };
        }
        return { success: true, message: "Transaction liked successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const followUser = async (_userToFollow: `0x${string}`): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "followUser",
            args: [_userToFollow],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Following user failed. Transaction reverted." };
        }
        return { success: true, message: "User followed successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const addComment = async (_transactionId: bigint, _text: string): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "addComment",
            args: [_transactionId, _text],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Adding comment failed. Transaction reverted." };
        }
        return { success: true, message: "Comment added successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const deleteComment = async (_transactionId: bigint, _commentIndex: bigint): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "deleteComment",
            args: [_transactionId, _commentIndex],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Deleting comment failed. Transaction reverted." };
        }
        return { success: true, message: "Comment deleted successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const donateToTransaction = async (transactionId: bigint, amount: bigint): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "donateToTransaction",
            args: [transactionId],
            value: amount,
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Donation failed. Transaction reverted." };
        }
        return { success: true, message: "Donation made successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const withdrawDonations = async (_transactionId: bigint): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "withdrawDonations",
            args: [_transactionId],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Withdrawing donations failed. Transaction reverted." };
        }
        return { success: true, message: "Donations withdrawn successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const withdrawAdminFunds = async (): Promise<TransactionResult> => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "withdrawAdminFunds",
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            return { success: false, message: "Withdrawing admin funds failed. Transaction reverted." };
        }
        return { success: true, message: "Admin funds withdrawn successfully!" };
    } catch (error) {
        return handleContractError(error);
    }
};

export const getDonorsAndDonations = async (transactionId: bigint): Promise<TransactionResult<{ donors: { address: string; amount: number }[]; total: number }>> => {
    try {
        const [donorsAddresses, donations] = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getDonorsAndDonations",
            args: [transactionId],
        });

        const donors = donorsAddresses.map((address, index) => ({
            address,
            amount: donations[index] ? Number(donations[index]) : 0,
        }));

        const total = donations.reduce((acc, amt) => acc + Number(amt), 0);

        return { 
            success: true, 
            message: "Donors and donations fetched successfully", 
            data: { donors, total } 
        };
    } catch (error) {
        return handleContractError(error);
    }
};

export const getUserTransactions = async (userAddress: `0x${string}`): Promise<TransactionResult<readonly any[]>> => {
    try {
        const transactions = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getUserTransactions",
            args: [userAddress],
        });
        return { success: true, message: "User transactions fetched successfully", data: transactions };
    } catch (error) {
        return handleContractError(error);
    }
};


export const getATransactions = async (id: bigint): Promise<TransactionResult<any>> => {
    try {
        const transactions = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "transactions",
            args: [id],
        });
        return { success: true, message: "Transaction fetched successfully", data: transactions };
    } catch (error) {
        return handleContractError(error);
    }
};

export const getUserBlocks = async (userAddress: `0x${string}`): Promise<TransactionResult<readonly any[]>> => {
    try {
        const blocks = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getUserBlocks",
            args: [userAddress],
        });
        return { success: true, message: "User blocks fetched successfully", data: blocks };
    } catch (error) {
        return handleContractError(error);
    }
};

// Get All Public Transactions
export const getPublicTransactions = async () => {
    console.log('about to call public tranaction')
    try {
        const transactions = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getPublicTransactions",
            args: [],
        });

        console.log('the resault of the call to get public tranaction', transactions)

        return transactions;
    } catch (error) {
        console.error("Error fetching public transactions:", error);
        return [];
    }
};

// Function to get all blocks
export const getAllBlocks = async () => {
    try {
        const blocks = await readContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "getAllBlocks",
            args: [],
        });
        console.log(blocks)
        return blocks;
    } catch (error) {
        console.error("Error fetching blocks:", error);
        alert("Failed to fetch blocks.");
    }
};

export const getBlockDetails = async (blockId: bigint): Promise<TransactionResult<any>> => {
    try {
        const blockDetails = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "blocks",
            args: [blockId],
        });
        return { success: true, message: "Block details fetched successfully", data: blockDetails };
    } catch (error) {
        return handleContractError(error);
    }
};

export const getUserProfile = async (userAddress: `0x${string}`): Promise<TransactionResult<any>> => {
    try {
        const userProfile = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "userProfiles",
            args: [userAddress],
        });
        return { success: true, message: "User profile fetched successfully", data: userProfile };
    } catch (error) {
        return handleContractError(error);
    }
};

export const getFollowers = async (_user: `0x${string}`): Promise<TransactionResult<readonly string[]>> => {
    try {
        const followers = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getFollowers",
            args: [_user],
        });
        return { success: true, message: "Followers fetched successfully", data: followers };
    } catch (error) {
        return handleContractError(error);
    }
};

export const getFollowing = async (_user: `0x${string}`): Promise<TransactionResult<readonly string[]>> => {
    try {
        const following = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getFollowing",
            args: [_user],
        });
        return  { success: true, message: "Following list fetched successfully", data: following };
    } catch (error) {
        return handleContractError(error);
    }
};

export const isFollowing = async (follower: `0x${string}`, following: `0x${string}`): Promise<TransactionResult<boolean>> => {
    try {
        const isUserFollowing = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "isFollowing",
            args: [follower, following],
        });
        return { success: true, message: "Follow status checked successfully", data: isUserFollowing };
    } catch (error) {
        return handleContractError(error);
    }
};

export const getTransactionComments = async (_transactionId: bigint): Promise<TransactionResult<readonly any[]>> => {
    try {
        const comments = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getTransactionComments",
            args: [_transactionId],
        });
        return { success: true, message: "Transaction comments fetched successfully", data: comments };
    } catch (error) {
        return handleContractError(error);
    }
};
