import config from "../wagmi";
import { readContract, writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { ABI, deployedAddress } from "./deployed-contract";

enum MediaType {
    Text = 0,
    Image = 1,
    Video = 2
}

// Function to create a new transaction
export const createTransaction = async (ipfsHash: string, title: string, description: string, mediaType: MediaType) => {
    try {
        // Write the transaction
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "createTransaction",
            args: [ipfsHash, title, description, MediaType[mediaType] as unknown as number],
        });

        // Wait for the transaction receipt
        const transaction = await waitForTransactionReceipt(config, {
            hash: txHash,
        });

        // Check the transaction status
        if (transaction.status === "reverted") {
            alert("Transaction creation failed. Transaction reverted.");
        } else {
            alert("Transaction created successfully!");
            return transaction;
        }
    } catch (error) {
        console.error("Error creating transaction:", error);
        alert("Transaction creation failed. Please check the console for more details.");
    }
};


// Function to create a new block
export const createBlock = async (_name: string, _description: string, _category: string) => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "createBlock",
            args: [_name, _description, _category],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            alert("Block creation failed. Transaction reverted.");
        } else {
            alert("Block created successfully!");
            return receipt;
        }
    } catch (error) {
        console.error("Error creating block:", error);
        alert("Block creation failed.");
    }
};


// Function to add a transaction to a block
export const addTransactionToBlock = async (blockId: bigint, transactionId: bigint,) => {
  try {
      const txHash = await writeContract(config, {
          address: deployedAddress,
          abi: ABI,
          functionName: "addTransactionToBlock",
          args: [blockId, transactionId],
      });

      const receipt = await waitForTransactionReceipt(config, { hash: txHash });
      if (receipt.status === "reverted") {
          alert("Adding transaction to block failed. Transaction reverted.");
      } else {
          alert("Transaction added to block successfully!");
      }
  } catch (error) {
      console.error("Error adding transaction to block:", error);
      alert("Adding transaction to block failed.");
  }
};

// Function to update admin
export const updateAdmin = async (_newAdmin: `0x${string}`) => {
  try {
      const txHash = await writeContract(config, {
          address: deployedAddress,
          abi: ABI,
          functionName: "updateAdmin",
          args: [_newAdmin],
      });

      const receipt = await waitForTransactionReceipt(config, { hash: txHash });
      if (receipt.status === "reverted") {
          alert("Updating admin failed. Transaction reverted.");
      } else {
          alert("Admin updated successfully!");
      }
  } catch (error) {
      console.error("Error updating admin:", error);
      alert("Updating admin failed.");
  }
};

// Function to update user profile
export const updateProfile = async (username: string, bio: string, profilePicture: string) => {
  try {
      const txHash = await writeContract(config, {
          address: deployedAddress,
          abi: ABI,
          functionName: "updateProfile",
          args: [username, bio, profilePicture],
      });

      const receipt = await waitForTransactionReceipt(config, { hash: txHash });
      if (receipt.status === "reverted") {
          alert("Updating profile failed. Transaction reverted.");
      } else {
          alert("Profile updated successfully!");
      }
  } catch (error) {
      console.error("Error updating profile:", error);
      alert("Updating profile failed.");
  }
};

// Function to like a transaction
export const likeTransaction = async (_transactionId: bigint) => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "likeTransaction",
            args: [_transactionId],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            alert("Liking transaction failed. Transaction reverted.");
        } else {
            alert("Transaction liked successfully!");
        }
    } catch (error) {
        console.error("Error liking transaction:", error);
        alert("Liking transaction failed.");
    }
};

// Function to follow a user
export const followUser = async (_userToFollow: `0x${string}`) => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "followUser",
            args: [_userToFollow],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            alert("Following user failed. Transaction reverted.");
        } else {
            alert("User followed successfully!");
        }
    } catch (error) {
        console.error("Error following user:", error);
        alert("Following user failed.");
    }
};

// Function to add a comment to a transaction
export const addComment = async (_transactionId: bigint, _text: string) => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "addComment",
            args: [_transactionId, _text],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            alert("Adding comment failed. Transaction reverted.");
        } else {
            alert("Comment added successfully!");
        }
    } catch (error) {
        console.error("Error adding comment:", error);
        alert("Adding comment failed.");
    }
};

// Function to delete a comment from a transaction
export const deleteComment = async (_transactionId: bigint, _commentIndex: bigint) => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "deleteComment",
            args: [_transactionId, _commentIndex],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            alert("Deleting comment failed. Transaction reverted.");
        } else {
            alert("Comment deleted successfully!");
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Deleting comment failed.");
    }
};

// Function to donate to a Canvas Transaction
export const donateToTransaction = async (transactionId: bigint, amount: bigint) => {
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
          alert("Donation failed. Transaction reverted.");
      } else {
          alert("Donation made successfully!");
      }
  } catch (error) {
      console.error("Error making donation:", error);
      alert("Donation failed.");
  }
};

// Function to withdraw donations from a transaction
export const withdrawDonations = async (_transactionId: bigint) => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "withdrawDonations",
            args: [_transactionId],
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            alert("Withdrawing donations failed. Transaction reverted.");
        } else {
            alert("Donations withdrawn successfully!");
        }
    } catch (error) {
        console.error("Error withdrawing donations:", error);
        alert("Withdrawing donations failed.");
    }
};

// Function to withdraw admin funds
export const withdrawAdminFunds = async () => {
    try {
        const txHash = await writeContract(config, {
            address: deployedAddress,
            abi: ABI,
            functionName: "withdrawAdminFunds",
        });

        const receipt = await waitForTransactionReceipt(config, { hash: txHash });
        if (receipt.status === "reverted") {
            alert("Withdrawing admin funds failed. Transaction reverted.");
        } else {
            alert("Admin funds withdrawn successfully!");
        }
    } catch (error) {
        console.error("Error withdrawing admin funds:", error);
        alert("Withdrawing admin funds failed.");
    }
};
export const getDonorsAndDonations = async (transactionId: bigint) => {
    try {
        const [donorsAddresses, donations] = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getDonorsAndDonations",
            args: [transactionId],
        });

        const donors = donorsAddresses.map((address, index) => ({
            address,
            amount: donations[index] ? Number(donations[index]) : 0, // Ensure it converts to number
        }));

        return { donors, total: donations.reduce((acc, amt) => acc + Number(amt), 0) }; // Example to calculate total
    } catch (error) {
        console.error("Error fetching donors and donations:", error);
        return { donors: [], total: 0 }; // Return a total of 0 on error
    }
};


// Fetch User Transactions
export const getUserTransactions = async (userAddress: `0x${string}`) => {
    try {
        const transactions = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getUserTransactions",
            args: [userAddress],
        });
        // console.log('from contract intraction', transactions)
        return transactions;
    } catch (error) {
        console.error("Error fetching user transactions:", error);
        return [];
    }
};
export const getATransactions = async (id: bigint) => {
    try {
        const transactions = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "transactions",
            args: [id],
        });
        // console.log('from contract intraction', transactions)
        return transactions;
    } catch (error) {
        console.error("Error fetching user transactions:", error);
        return [];
    }
};

// Fetch User Blocks
export const getUserBlocks = async (userAddress: `0x${string}`) => {
    try {
        const blocks = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getUserBlocks",
            args: [userAddress],
        });

        return blocks;
    } catch (error) {
        console.error("Error fetching user blocks:", error);
        return [];
    }
};

// Get All Public Transactions
export const getPublicTransactions = async () => {
    try {
        const transactions = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "getPublicTransactions",
            args: [],
        });

        console.log(transactions)

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

        return blocks;
    } catch (error) {
        console.error("Error fetching blocks:", error);
        alert("Failed to fetch blocks.");
    }
};


// Fetch Block Details
export const getBlockDetails = async (blockId: bigint) => {
    try {
        const blockDetails = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "blocks",
            args: [blockId],
        });
        // console.log(blockDetails)
        return blockDetails;
    } catch (error) {
        console.error("Error fetching block details:", error);
        return null;
    }
};

// Fetch User Profile
export const getUserProfile = async (userAddress: `0x${string}`) => {
    try {
        const userProfile = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "userProfiles",
            args: [userAddress],
        });

        return userProfile;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
};

// Fetch followers of a user
export const getFollowers = async (_user: `0x${string}`) => {
  try {
      const followers = await readContract(config, {
          abi: ABI,
          address: deployedAddress,
          functionName: "getFollowers",
          args: [_user],
      });

      return followers;
  } catch (error) {
      console.error("Error fetching followers:", error);
      return [];
  }
};

// Fetch users being followed by a user
export const getFollowing = async (_user: `0x${string}`) => {
  try {
      const following = await readContract(config, {
          abi: ABI,
          address: deployedAddress,
          functionName: "getFollowing",
          args: [_user],
      });

      return following;
  } catch (error) {
      console.error("Error fetching following list:", error);
      return [];
  }
};

// Fetch users being followed by a user
export const isFollowing = async (follower: `0x${string}`, following: `0x${string}`) => {
    try {
        const isUserFollowing = await readContract(config, {
            abi: ABI,
            address: deployedAddress,
            functionName: "isFollowing",
            args: [follower, following],
        });
  
        return isUserFollowing;
    } catch (error) {
        console.error("Error checking follow status:", error);
        return false; 
    }
  };
  

// Fetch comments on a transaction
export const getTransactionComments = async (_transactionId: bigint) => {
  try {
      const comments = await readContract(config, {
          abi: ABI,
          address: deployedAddress,
          functionName: "getTransactionComments",
          args: [_transactionId],
      });

      return comments;
  } catch (error) {
      console.error("Error fetching transaction comments:", error);
      return [];
  }
};
