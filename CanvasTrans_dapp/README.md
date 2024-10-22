# CanvasTrans DApp - Empowering Creators with Decentralized Donations

Welcome to CanvasTrans, a cutting-edge decentralized Social application (DApp) designed to empower creators by enabling them to receive and manage donations on the Arbitrum Sepolia testnet. Our platform ensures transparent, fair, and efficient handling of donations, providing a sustainable way for creators to earn while maintaining platform integrity.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Setup and Testing](#project-setup)
- [Environment Configuration](#environment-configuration)
- [Deployment](#deployment)
- [Smart Contracts](#contracts-breakdown)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview
CanvasTrans is a decentralized platform built on smart contracts, offering the following key features:
- **Content Management**: Creators can create and manage their content seamlessly.
- **Donation System**: Supporters can donate ETH to creators.
- **Fair Distribution**: Creators receive 95% of the donations, with 5% allocated to the admin for platform maintenance.
- **Admin Withdrawal**: Admins can withdraw the accumulated platform funds.

Deployed on the Arbitrum Sepolia testnet, CanvasTrans leverages Ethereum’s layer 2 scaling solution for cost-effective and fast transactions.

## Prerequisites
Before setting up CanvasTrans, ensure you have the following:
- **Node.js** (version 16.x or higher)
- **Foundry** (for compiling and deploying contracts)
- **MetaMask** (for DApp interaction)
- **Arbitrum Sepolia testnet ETH** (for deployment and testing)
- **Arbiscan API Key** (for contract verification)

## Project Setup
### Clone the Repository
```bash
git clone https://github.com/chiemezie1/CanvasTransHub.git

cd CanvasTransHub
```
### Install Dependencies

bash **Copy code**

```bash
npm install

```

### Install Foundry
If you haven't already installed Foundry, install it by following the instructions [here](https://github.com/gakonst/foundry).

### Compile Contracts

```bash
forge build
```

### Testing

To ensure everything works as expected, we have included test cases using Foundry. Run the tests using the following command:

```bash
forge test
```
Tests include:
- Creating a transaction
- Creating a Block for a category of post
- Adding transaction to a Block
- Donating to a transaction
- Creator withdrawing donations (95%) 
- Admin withdrawing from the platform contract
- Check for update profile 
- Like transaction

```bash
Ran 8 tests for test/CanvasTrans.t.sol:CanvasTransTest
[PASS] testAdminWithdrawalWithoutDonations() (gas: 15364)
[PASS] testCreateBlock() (gas: 157102)
[PASS] testCreateTransaction() (gas: 207639)
[PASS] testDonateToTransaction() (gas: 303356)
[PASS] testFollowUser() (gas: 181022)
[PASS] testLikeTransaction() (gas: 251381)
[PASS] testUpdateProfile() (gas: 92734)
[PASS] testWithdrawDonations() (gas: 332206)
Suite result: ok. 8 passed; 0 failed; 0 skipped; finished in 1.35ms (1.29ms CPU time)
```

Make sure you have test ETH in your wallet to cover gas fees on the Arbitrum Sepolia testnet.

## Environment Configuration

To interact with the Arbitrum Sepolia network and verify the contract, you need to set up environment variables.

### Create a `.env` file in the root directory of the project:

```bash
touch .env 
```
    
### Add the following content to the `.env` file:
    
```bash

# API KEY from Arbiscan
API_KEY="REPLACE WITH YOUR ARBISCAN API KEY"

# PRIVATE KEY from MetaMask
PRIVATE_KEY="REPLACE WITH YOUR WALLET PRIVATE KEY"

# RPC URL for Arbitrum Sepolia Testnet
RPC_URL="https://sepolia-rollup.arbitrum.io/rpc"
```
    
- Replace `API_KEY` with your actual API key from Arbiscan.
- Replace `PRIVATE_KEY` with your private key from MetaMask (ensure the key corresponds to the wallet that holds test ETH on the Arbitrum Sepolia network).

### Load the `.env`
At the root of the directory (CanvasTransHub) and run the following command.

```bash
source .env
```

## Deployment

Once you've set up your environment variables, you can deploy the smart contracts to the Arbitrum Sepolia testnet.

### **Deploy the Smart Contracts:**
Use the following command to deploy the contracts to Arbitrum Sepolia:

```bash
forge create --rpc-url "arbitrumSepolia" --private-key "${PRIVATE_KEY}" --verifier-url "https://api-sepolia.arbiscan.io/api" -e "${API_KEY}" --verify src/CanvasTrans.sol:CanvasTrans
```
- --verifier-url "https://api-sepolia.arbiscan.io/api": Specifies the URL for the Arbiscan Sepolia API which is used to verify the CanvasTrans smart contract.
- -e "${API_KEY}": Uses the API key from the .env file for verification.
- --verify src/CanvasTrans.sol:CanvasTrans: Instructs Foundry to verify the smart contract after deployment.

### Deployment Log
Here is the log after running the deployment:

```bash
Deployer: 0x8F673B413c540257043baF1cF647Fb9dD699Fa2b
Deployed to: 0x372b5465f79054fAAbC37e473bce83B50493f2E5
Transaction hash: 0x89e007772505c7488d7e851f7dcc732d0a876046694f366223e17c8f6c2d6637
Starting contract verification...
Waiting for etherscan to detect contract deployment...
Start verifying contract `0x372b5465f79054fAAbC37e473bce83B50493f2E5` deployed on arbitrum-sepolia

Submitting verification for [src/CanvasTrans.sol:CanvasTrans] 0x372b5465f79054fAAbC37e473bce83B50493f2E5.
Submitted contract for verification:
        Response: `OK`
        GUID: `u1adjcdgdfxs2p8yvv7vtczeetjffjd6rtkfjcagem7zbfzjpf`
        URL: https://sepolia.arbiscan.io/address/0x372b5465f79054faabc37e473bce83b50493f2e5
Contract verification status:
Response: `NOTOK`
Details: `Pending in queue`
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
```

## Contracts Breakdown

- **CanvasTrans.sol**:
This is the core contract of the DApp. It contains functions to create content transactions, add a transaction to a type of block, donate to creators, withdraw donations, and allows the admin to withdraw platform fees.
    
Key Functions:

- `createTransaction`: Allows a creator to create a new content transaction.
- `donateToTransaction`: Enables users to donate ETH to a specific content transaction.
- `withdrawDonations`: Facilitates creators in withdrawing 95% of their donations.
---

## Future Enhancements

- **Additional Features**: Implement features such as voting for content, edicting contect, stacking and investment.
- **Security Audits**: Conduct formal security audits to ensure the platform is secure and reliable.

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this project, provided the appropriate credit is given.