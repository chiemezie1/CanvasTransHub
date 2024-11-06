


// import React, { useState } from "react";
// import { addTransactionToBlock } from "@/contracts/contractInteractions"; // Adjust the import path as needed

// const AddTransactionToBlockForm = () => {
//     const [transactionId, setTransactionId] = useState("");
//     const [blockId, setBlockId] = useState("");
//     const [statusMessage, setStatusMessage] = useState("");

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const receipt = await addTransactionToBlock(BigInt(transactionId), BigInt(blockId));
    //         setStatusMessage("Transaction added to block successfully!");
    //         setTransactionId("");
    //         setBlockId("");
    //     } catch (error) {
    //         console.error("Error submitting form:", error);
    //         setStatusMessage("Adding transaction to block failed.");
    //     }
    // };

//     return (
//         <div>
//             <h2>Add Transaction to Block</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Transaction ID:
//                     <input
//                         type="text"
//                         value={transactionId}
//                         onChange={(e) => setTransactionId(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Block ID:
//                     <input
//                         type="text"
//                         value={blockId}
//                         onChange={(e) => setBlockId(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Add Transaction</button>
//             </form>
//             {statusMessage && <p>{statusMessage}</p>}
//         </div>
//     );
// };

// export default AddTransactionToBlockForm;





// import React, { useState } from "react";
// import { followUser } from "@/contracts/contractInteractions"; // Adjust the import path as needed

// const FollowUserForm = () => {
//     const [userToFollow, setUserToFollow] = useState("");
//     const [statusMessage, setStatusMessage] = useState("");

//     // Handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             // Call the followUser function with the input address
//             await followUser(userToFollow);
//             setStatusMessage("User followed successfully!");
//             // Clear the input field after successful follow
//             setUserToFollow("");
//         } catch (error) {
//             console.error("Error following user:", error);
//             setStatusMessage("Following user failed.");
//         }
//     };

//     return (
//         <div>
//             <h2>Follow a User</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     User Address (0x...):
//                     <input
//                         type="text"
//                         value={userToFollow}
//                         onChange={(e) => setUserToFollow(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Follow User</button>
//             </form>
//             {statusMessage && <p>{statusMessage}</p>}
//         </div>
//     );
// };

// export default FollowUserForm;

// import React, { useState } from "react";
// import { withdrawDonations } from "@/contracts/contractInteractions"; // Adjust the import path as needed

// const WithdrawDonationsForm = () => {
//     const [transactionId, setTransactionId] = useState("");
//     const [statusMessage, setStatusMessage] = useState("");

//     // Handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             // Parse transactionId as bigint
//             const txId = BigInt(transactionId);
//             // Call the withdrawDonations function
//             await withdrawDonations(txId);
//             setStatusMessage("Donations withdrawn successfully!");
//             // Clear the input field after successful withdrawal
//             setTransactionId("");
//         } catch (error) {
//             console.error("Error withdrawing donations:", error);
//             setStatusMessage("Withdrawing donations failed.");
//         }
//     };

//     return (
//         <div>
//             <h2>Withdraw Donations</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Transaction ID:
//                     <input
//                         type="text"
//                         value={transactionId}
//                         onChange={(e) => setTransactionId(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Withdraw</button>
//             </form>
//             {statusMessage && <p>{statusMessage}</p>}
//         </div>
//     );
// };

// export default WithdrawDonationsForm;


// import React, { useState } from "react";
// import { withdrawAdminFunds } from "@/contracts/contractInteractions"; // Adjust the import path as needed

// const WithdrawAdminFundsForm = () => {
//     const [statusMessage, setStatusMessage] = useState("");

//     // Handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             // Call the withdrawAdminFunds function
//             await withdrawAdminFunds();
//             setStatusMessage("Admin funds withdrawn successfully!");
//         } catch (error) {
//             console.error("Error withdrawing admin funds:", error);
//             setStatusMessage("Withdrawing admin funds failed.");
//         }
//     };

//     return (
//         <div>
//             <h2>Withdraw Admin Funds</h2>
//             <form onSubmit={handleSubmit}>
//                 <button type="submit">Withdraw Funds</button>
//             </form>
//             {statusMessage && <p>{statusMessage}</p>}
//         </div>
//     );
// };

// export default WithdrawAdminFundsForm;


// import React, { useState } from "react";
// import { getDonorsAndDonations } from "@/contracts/contractInteractions"; 

// const DonorList = () => {
//     const [transactionId, setTransactionId] = useState("");
//     const [donors, setDonors] = useState([]);
//     const [donations, setDonations] = useState([]);
//     const [errorMessage, setErrorMessage] = useState("");

//     // Handle fetching donors and donations
//     const handleFetchDonors = async (event) => {
//         event.preventDefault();
//         setErrorMessage(""); // Clear previous error message

//         if (!transactionId) {
//             setErrorMessage("Please enter a transaction ID.");
//             return;
//         }

//         try {
//             const { donors, donations } = await getDonorsAndDonations(BigInt(transactionId));
//             setDonors(donors);
//             setDonations(donations);
//         } catch (error) {
//             setErrorMessage("Failed to fetch donors and donations.");
//             console.error("Error fetching donors and donations:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Get Donors and Donations</h2>
//             <form onSubmit={handleFetchDonors}>
//                 <label>
//                     Transaction ID:
//                     <input
//                         type="text"
//                         value={transactionId}
//                         onChange={(e) => setTransactionId(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <button type="submit">Fetch Donors</button>
//             </form>

//             {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//             {donors.length > 0 && donations.length > 0 && (
//                 <div>
//                     <h3>Donors and Donations</h3>
//                     <ul>
//                         {donors.map((donor, index) => (
//                             <li key={donor}>
//                                 {donor}: {donations[index]} ETH
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DonorList;


// import { useState, useEffect } from "react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { getUserTransactions } from "@/contracts/contractInteractions"; 

// export default function WalletAddressComponent() {
//     const [walletAddress, setWalletAddress] = useState<string | null>(null);
//     const [transactions, setTransactions] = useState([]);
//     const [isFetching, setIsFetching] = useState(false); // Track fetching state

//     // Function to fetch transactions
//     const fetchTransactions = async () => {
//         if (walletAddress) {
//             setIsFetching(true); // Start loading state
//             const userTransactions = await getUserTransactions(walletAddress);
//             setTransactions(userTransactions);
//             setIsFetching(false); // Stop loading state
//         }
//     };

//     useEffect(() => {
//         if (walletAddress) {
//             fetchTransactions(); // Auto-fetch when wallet is connected
//         }
//     }, [walletAddress]);

//     return (
//         <ConnectButton.Custom>
//             {({ account, openConnectModal, mounted }) => {
//                 const ready = mounted;
//                 const connected = ready && account;

//                 useEffect(() => {
//                     if (connected && account?.address) {
//                         setWalletAddress(account.address);
//                     }
//                 }, [connected, account?.address]);

//                 return (
//                     <div>
//                         {!connected ? (
//                             <button onClick={openConnectModal}>Connect Wallet</button>
//                         ) : (
//                             <div>
//                                 <span>Address: {walletAddress}</span>
//                                 <button onClick={fetchTransactions} disabled={isFetching}>
//                                     {isFetching ? "Fetching..." : "Fetch Transactions"}
//                                 </button>
//                                 <h3>Transactions:</h3>
//                                 <ul>
//                                     {transactions.length > 0 ? (
//                                         transactions.map((tx, index) => (
//                                             <li key={index}>{JSON.stringify(tx)}</li>
//                                         ))
//                                     ) : (
//                                         <li>No transactions found.</li>
//                                     )}
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 );
//             }}
//         </ConnectButton.Custom>
//     );
// }


// import { getUserTransactions } from "@/contracts/contractInteractions";
// import { useState, useEffect } from "react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useAccount } from "wagmi";

// const Forum = () => {
//     const { address, isConnected } = useAccount();
//     const [account, setAccount] = useState(address);
//     const [transactions, setTransactions] = useState([]);

    // useEffect(() => {
    //     setAccount(address);
    //     if (!isConnected) {
    //         console.log("Account Disconnected");
    //         setTransactions([]);
    //     }
    // }, [address, isConnected]);

//     const fetchUserTransactions = async () => {
//         if (!account) {
//             alert("Please connect your wallet first.");
//             return;
//         }
//         try {
//             const userTransactions = await getUserTransactions(account);
//             setTransactions(userTransactions);
//             console.log("User Transactions:", userTransactions);
//         } catch (error) {
//             console.error("Error fetching user transactions:", error);
//         }
//     };

//     return (
//         <div>
//             <header>
//                 <ConnectButton label={!isConnected ? "Connect Wallet" : ""} />
//                 <p>Connected Wallet: {account}</p>
//             </header>

//             <div>
//                 <button onClick={fetchUserTransactions} disabled={!isConnected}>
//                     Get User Transactions
//                 </button>
//                 {transactions.length > 0 && (
//                     <div>
//                         <h3>User Transactions:</h3>
//                         <ul>
//                             {transactions.map((tx, index) => (
//                                 <li key={index}>
//                                     <p>Transaction #{index + 1}</p>
//                                     <pre>{JSON.stringify(tx, (key, value) => {
//                                         // Ensure only serializable values are included
//                                         return typeof value === "object" && value !== null
//                                             ? value
//                                             : String(value);
//                                     }, 2)}</pre>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Forum;



// import { getUserBlocks } from "@/contracts/contractInteractions";
// import { useState, useEffect } from "react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { useAccount } from "wagmi";

// const Forum = () => {
//     const { address, isConnected } = useAccount();
//     const [blocks, setBlocks] = useState([]);

    // const fetchUserBlocks = async () => {
    //     if (!address) {
    //         alert("Please connect your wallet first.");
    //         return;
    //     }
    //     try {
    //         const userBlocks = await getUserBlocks(address);
    //         setBlocks(userBlocks);
    //         console.log("User Blocks:", userBlocks);
    //     } catch (error) {
    //         console.error("Error fetching user blocks:", error);
    //     }
    // };

//     return (
//         <div>
//             <header>
//                 Connected Wallet: {address}
//             </header>

//             <div>
//                 <ConnectButton />
//                 <button onClick={fetchUserBlocks} disabled={!isConnected}>
//                     Get User Blocks
//                 </button>

//                 {blocks.length > 0 && (
//                     <div>
//                         <h3>User Blocks:</h3>
//                         <ul>
//                             {blocks.map((block, index) => (
//                                 <li key={index}>
//                                     <p>Block #{index + 1}</p>
//                                     <pre>
//                                         {JSON.stringify(
//                                             block,
//                                             (key, value) => (typeof value === "bigint" ? value.toString() : value),
//                                             2
//                                         )}
//                                     </pre>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Forum;



// import React, { useState } from "react";
// import { getPublicTransactions } from "@/contracts/contractInteractions"; // Adjust path as needed

// const PublicTransactionList = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [loading, setLoading] = useState(false);

    // // Fetch transactions when button is clicked
    // const fetchTransactions = async () => {
    //     setLoading(true);
    //     setErrorMessage(""); // Clear any previous error message
    //     try {
    //         const data = await getPublicTransactions();
    //         setTransactions(data);
    //     } catch (error) {
    //         setErrorMessage("Failed to load public transactions.");
    //         console.error("Error fetching public transactions:", error);
    //     }
    //     setLoading(false);
    // };

//     return (
//         <div>
//             <h2>Public Transactions</h2>

//             <button onClick={fetchTransactions} disabled={loading}>
//                 {loading ? "Fetching..." : "Fetch Transactions"}
//             </button>

//             {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//             {transactions.length > 0 ? (
//                 <ul>
//                     {transactions.map((transaction, index) => (
//                         <li key={index}>
//                             <p><strong>title:</strong> {transaction.title} ETH</p>>
//                             <p><strong>Transaction ID:</strong> {transaction.ipfsHash}</p>
//                             <p><strong>Transaction creator:</strong> {transaction.creator}</p>
//                             <p><strong>Transaction likes:</strong> {transaction.likes}</p>
//                             <p><strong>Description:</strong> {transaction.description}</p>
//                             <p><strong>Amount:</strong> {transaction.totalDonations} ETH</p>>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 !loading && <p>No public transactions available.</p>
//             )}
//         </div>
//     );
// };

// export default PublicTransactionList;


// import React, { useState } from "react";
// import { getBlockDetails } from "@/contracts/contractInteractions"; // Adjust path as needed

// const BlockDetails = () => {
//     const [blockId, setBlockId] = useState("");
//     const [blockDetails, setBlockDetails] = useState(null);
//     const [errorMessage, setErrorMessage] = useState("");

//     const handleFetchDetails = async () => {
//         setErrorMessage("");
//         setBlockDetails(null);

//         try {
//             if (!blockId) {
//                 setErrorMessage("Please enter a valid block ID.");
//                 return;
//             }

//             const details = await getBlockDetails(BigInt(blockId));
//             if (details) {
//                 setBlockDetails(details);
//             } else {
//                 setErrorMessage("No details found for the specified block ID.");
//             }
//         } catch (error) {
//             setErrorMessage("Failed to fetch block details.");
//             console.error("Error fetching block details:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Fetch Block Details</h2>
//             <input
//                 type="text"
//                 value={blockId}
//                 onChange={(e) => setBlockId(e.target.value)}
//                 placeholder="Enter Block ID"
//             />
//             <button onClick={handleFetchDetails}>Fetch Details</button>

//             {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//             {blockDetails && (
//                 <div>
//                     <h3>Block Information</h3>
//                     <p><strong>Block ID:</strong> {blockId}</p>
//                     <p><strong>Name:</strong> {blockDetails.name}</p>
//                     <p><strong>Description:</strong> {blockDetails.description}</p>
//                     <p><strong>Timestamp:</strong> {new Date(Number(blockDetails.timestamp) * 1000).toLocaleString()}</p>
//                     {/* Add other fields as needed */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BlockDetails;


// import React, { useState } from "react";
// import { uploadToPinata, fetchFromPinata } from "@/lib/PinataService";

// function PinataUploader() {
//   const [file, setFile] = useState<File | null>(null);
//   const [url, setUrl] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (file) {
//       try {
//         const hash = await uploadToPinata(file);
//         const fileUrl = fetchFromPinata(hash);
//         setUrl(fileUrl);
//         console.log("File uploaded to:", fileUrl);
//       } catch (error) {
//         console.error("Upload failed:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload to Pinata</button>
//       {url && <p>File URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>}
//     </div>
//   );
// }

// export default PinataUploader;



// 0:
// uint256: id 1
// 1:
// string: ipfsHash ddddd
// 2:
// string: title ddddd
// 3:
// string: description dddd
// 4:
// uint8: mediaType 1
// 5:
// address: creator 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
// 6:
// uint256: transBlock 0
// 7:
// uint256: likes 0
// 8:
// uint256: timestamp 1730315821
// 9:
// uint256: totalDonations 0




// 'use client'

// import React, { useState } from 'react'
// import { MessageAlert } from './message-alert'
// import { Button } from "@/components/ui/button"

// export default function AlertExamples() {
//   const [activeAlert, setActiveAlert] = useState<string | null>(null)

//   const showAlert = (type: string) => {
//     setActiveAlert(type)
//     setTimeout(() => setActiveAlert(null), 3000)
//   }

//   return (
//     <div className="p-8 space-y-4">
//       <h1 className="text-2xl font-bold mb-4">Alert Examples</h1>
      
//       {/* Info Alert */}
//       <Button onClick={() => showAlert('info')} variant="outline">
//         Show Info Alert
//       </Button>
//       {activeAlert === 'info' && (
//         <MessageAlert
//           message="This is an informational message."
//           onClose={() => setActiveAlert(null)}
//           type="info"
//         />
//       )}

//       {/* Success Alert */}
//       <Button onClick={() => showAlert('success')} variant="outline">
//         Show Success Alert
//       </Button>
//       {activeAlert === 'success' && (
//         <MessageAlert
//           message="Operation completed successfully!"
//           onClose={() => setActiveAlert(null)}
//           type="success"
//         />
//       )}

//       {/* Warning Alert */}
//       <Button onClick={() => showAlert('warning')} variant="outline">
//         Show Warning Alert
//       </Button>
//       {activeAlert === 'warning' && (
//         <MessageAlert
//           message="Please be cautious with this action."
//           onClose={() => setActiveAlert(null)}
//           type="warning"
//         />
//       )}

//       {/* Error Alert */}
//       <Button onClick={() => showAlert('error')} variant="outline">
//         Show Error Alert
//       </Button>
//       {activeAlert === 'error' && (
//         <MessageAlert
//           message="An error occurred. Please try again."
//           onClose={() => setActiveAlert(null)}
//           type="error"
//         />
//       )}

//       {/* Custom Alert */}
//       <Button onClick={() => showAlert('custom')} variant="outline">
//         Show Custom Alert
//       </Button>
//       {activeAlert === 'custom' && (
//         <MessageAlert
//           message={
//             <div className="flex items-center">
//               <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                 <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//               </svg>
//               <span>This is a custom alert with an icon!</span>
//             </div>
//           }
//           onClose={() => setActiveAlert(null)}
//           type="info"
//         />
//       )}
//     </div>
//   )
// }




'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Plus, Image as ImageIcon, Film, FileText, DollarSign } from 'lucide-react'
import { getUserTransactions, getUserBlocks, addTransactionToBlock, getTransactionComments, withdrawDonations } from "@/contracts/contractInteractions"
import { useAccount } from "wagmi"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageAlert } from '../MessageAlert'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CanvasTransItem {
  id: string;
  ipfsHash: string;
  title: string;
  content: string;
  type: string;
  likes: number;
  comments: number;
  timestamp: bigint;
  transBlock: number;
  blockCategory: string | null;
  blockId: string | null;
  creator: string;
  totalDonations: bigint;
}

interface Block {
  id: string;
  name: string;
  category: string;
}

interface Comment {
  commenter: string;
  text: string;
  timestamp: bigint;
  name: string;
  profilePicture: string;
}

interface TransactionResult {
  success: boolean;
  message: string;
  data?: any;
}

export interface UserFeedProps {
  transactions: CanvasTransItem[]
}

export default function UserFeed({ transactions: initialTransactions }: UserFeedProps) {
  const [posts, setPosts] = useState<CanvasTransItem[]>(initialTransactions);
  const { address, isConnected } = useAccount();
  const [showBlockDropdown, setShowBlockDropdown] = useState<{ [postId: string]: boolean }>({});
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertState, setAlertState] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error' | null }>({ message: '', type: null });
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const [showComments, setShowComments] = useState<{ [postId: string]: boolean }>({});

  useEffect(() => {
    const fetchUserBlocks = async () => {
      if (!address) return;
      try {
        const result: TransactionResult = await getUserBlocks(address);
        if (!result.success) {
          throw new Error(result.message);
        }
        const userBlocks = result.data;
        setBlocks(userBlocks.map((block: any) => ({
          id: block.id.toString(),
          name: block.name,
          category: block.category
        })));
      } catch (error) {
        console.error("Error fetching blocks:", error);
        setAlertState({ message: "Failed to fetch blocks. Some features may be limited.", type: 'warning' });
      }
    };

    fetchUserBlocks();
    setIsLoading(false);
  }, [address]);

  const handleAddToBlockClick = (postId: string) => {
    setShowBlockDropdown(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleBlockSelect = async (selectedBlockId: string, postId: string) => {
    try {
      const result: TransactionResult = await addTransactionToBlock(BigInt(selectedBlockId), BigInt(postId));
      if (!result.success) {
        throw new Error(result.message);
      }
      setShowBlockDropdown(prev => ({ ...prev, [postId]: false }));

      const selectedBlock = blocks.find(block => block.id === selectedBlockId);
      
      setPosts(prevPosts => prevPosts.map(post => 
        post.id === postId 
          ? { ...post, transBlock: Number(selectedBlockId), blockCategory: selectedBlock?.category || null, blockId: selectedBlockId } 
          : post
      ));
      setAlertState({ message: "Transaction added to block successfully!", type: 'success' });
    } catch (error) {
      console.error("Error adding transaction to block:", error);
      setAlertState({ message: "Failed to add transaction to block. Please try again.", type: 'error' });
    }
  };

  const handleCommentsClick = async (postId: string) => {
    if (!comments[postId]) {
      try {
        const result: TransactionResult = await getTransactionComments(BigInt(postId));
        if (result.success) {
          setComments(prev => ({ ...prev, [postId]: result.data }));
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setAlertState({ message: "Failed to fetch comments. Please try again.", type: 'error' });
      }
    }
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleWithdraw = async (postId: string) => {
    try {
      const result: TransactionResult = await withdrawDonations(BigInt(postId));
      if (result.success) {
        setPosts(prevPosts => prevPosts.map(post => 
          post.id === postId ? { ...post, totalDonations: BigInt(0) } : post
        ));
        setAlertState({ message: "Withdrawal successful!", type: 'success' });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setAlertState({ message: "Withdrawal failed. Please try again.", type: 'error' });
    }
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
      case 'video': return <Film className="w-5 h-5 text-green-500 dark:text-green-400" />;
      case 'text': return <FileText className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {alertState.type && (
        <MessageAlert
          message={alertState.message}
          onClose={() => setAlertState({ message: '', type: null })}
          type={alertState.type}
        />
      )}
      {posts.length === 0 ? (
        <Card className="text-center p-8">
          <p className="text-muted-foreground">
            No posts found. Start creating or interacting with content to see it here!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    {getPostIcon(post.type)}
                    <h3 className="text-lg font-semibold truncate">{post.title}</h3>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full px-2 py-1">
                    {new Date(Number(post.timestamp)).toLocaleDateString()}
                  </span>
                </CardHeader>
                <CardContent>
                  {post.type === 'image' && (
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${post.ipfsHash}`}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
                  )}
                  {post.type === 'video' && (
                    <video
                      src={`https://gateway.pinata.cloud/ipfs/${post.ipfsHash}`}
                      controls
                      className="w-full h-48 object-cover rounded-md mb-4"
                      onError={(e) => { (e.target as HTMLVideoElement).textContent = 'Failed to load video'; }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <p className="text-muted-foreground line-clamp-3">{post.content}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                      onClick={() => handleCommentsClick(post.id)}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{comments[post.id]?.length || post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span>{Number(post.totalDonations) / 1e18} ETH</span>
                    </Button>
                  </div>
                  {post.creator === address && Number(post.totalDonations) > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWithdraw(post.id)}
                      className="flex items-center space-x-1 bg-transparent border-gray-300 dark:border-gray-600 text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-light/10"
                    >
                      Withdraw
                    </Button>
                  )}
                  {post.transBlock === 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToBlockClick(post.id)}
                      className="flex items-center space-x-1 bg-transparent border-gray-300 dark:border-gray-600 text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-light/10"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Block</span>
                    </Button>
                  )}
                </CardFooter>
                <AnimatePresence>
                  {showBlockDropdown[post.id] && post.transBlock === 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <Select onValueChange={(value) => handleBlockSelect(value, post.id)}>
                        <SelectTrigger className="w-full text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-gray-100">
                          <SelectValue placeholder="Choose a block" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-100 dark:bg-gray-800">
                          {blocks.map((block) => (
                            <SelectItem key={block.id} value={block.id} className="text-gray-900 dark:text-gray-100">
                              {block.name} - {block.category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showComments[post.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <h4 className="text-lg font-semibold mb-2">Comments</h4>
                      {comments[post.id] && comments[post.id].length > 0 ? (
                        comments[post.id].map((comment, index) => (
                          <div key={index} className="flex items-start space-x-2 mb-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://gateway.pinata.cloud/ipfs/${comment.profilePicture}`} />
                              <AvatarFallback>{comment.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{comment.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{comment.text}</p>
                              <p className="text-xs text-gray-500">{new Date(Number(comment.timestamp) * 1000).toLocaleString()}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No comments yet.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}