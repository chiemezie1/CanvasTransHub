


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


