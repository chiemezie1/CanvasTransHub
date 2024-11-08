# CanvaTrans: Revolutionizing Content Sharing with Web3 Technology

CanvaTrans is redefining digital content sharing by leveraging Web3 technology to create a decentralized platform that prioritizes transparency, ownership, direct earnings, and creator autonomy.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Styling](#styling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

CanvaTrans is a decentralized content-sharing platform built on Web3 technology (arbitrum-sepolia), enabling users to create, manage, and monetize their digital content in an entirely new way. By connecting their wallets, users can begin creating and earning instantly—no need for a traditional account setup, a unique solution in the creator economy.


## Features

- Wallet-Based Access: Users connect their wallets to start creating posts or "Trans."
- Monetization and Earnings: Users can earn from their content directly through donations, with a 95% revenue share.
- Seamless Profile Management: Users have full control over their identity and content ownership.
- Engaging Landing Page: Featuring "how it works" sections, top creators showcase, and live transaction events.
- CanvaTrans Wall/Hub Page: Central hub for all posts with category filtering and direct donation support.
- User Block Page: Personalized content management space for organizing creations and tracking interactions.

## Technologies Used

- React 18.3.0
- Next.js 14.2.3
- TypeScript 5.4.2
- Tailwind CSS 3.4.14
- RainbowKit 2.1.5
- wagmi 2.12.10
- Framer Motion 11.11.11
- Radix UI (various components)

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc` or latest stable)
- Yarn 1.2 or later

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/chiemezie1/CanvasTransHub.git
   ```

2. Navigate to the project directory
   ```bash
   cd CanvasTransHub
   ```

3. Install dependencies
   ```bash
   yarn install
   ```

4. Set up environment variables
   Create a `.env` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your_wallet_connect_project_id"
   NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS="your_deployed_contract_address"
   NEXT_PUBLIC_ENABLE_TESTNETS="true"
   NEXT_PUBLIC_PINATA_API_KEY="your_pinata_api_key"
   NEXT_PUBLIC_PINATA_API_SECRET="your_pinata_api_secret"
   NEXT_PUBLIC_JWT="your_jwt"
   ```

## Usage

To start the development server:

```bash
yarn run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
CanvasTransHub/
├── components/
│   ├── canvasTransWall/
│   ├── landingPage/
│   ├── ui/
│   ├── userBlock/
│   └── ...
├── contracts/
├── images/
├── lib/
├── pages/
├── styles/
├── types/
├── .env
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── wagmi.config.ts
└── yarn.lock
```

## Configuration

- `.env`: Contains environment variables for API keys, contract addresses, and other configuration settings.
- `next.config.js`: Next.js configuration file.
- `tailwind.config.js`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.
- `wagmi.config.ts`: Configuration for wagmi, a React Hooks library for Ethereum.

## API Integration

The frontend integrates with blockchain APIs using wagmi and viem. Key interactions include:

- Reading and writing to smart contracts using `readContract` and `writeContract` from @wagmi/core.
- Watching for contract events using `useWatchContractEvent` from wagmi.
- Interacting with IPFS via Pinata for content storage.

Authentication is handled through wallet connections using RainbowKit.

## State Management

The project primarily uses React's built-in state management (useState, useEffect) and Context API. For more complex state management, it leverages wagmi's hooks for blockchain interactions.

## Styling

This project uses Tailwind CSS for styling, with custom configurations in `tailwind.config.js`. Additional styling is achieved through:

- Radix UI components for accessible UI elements
- Framer Motion for animations
- Custom UI components in the `components/ui/` directory


## Deployment

The project is deployed on Vercel. The live version can be accessed at [https://canvas-trans-hub.vercel.app/](https://canvas-trans-hub.vercel.app/).

For deploying your own instance:

1. Fork the repository
2. Set up a Vercel account and connect it to your GitHub
3. Configure the environment variables in Vercel
4. Deploy the project

## Contributing

We welcome contributions to CanvaTrans! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a pull request

Please ensure your code adheres to the project's coding standards.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [RainbowKit](https://rainbowkit.com)
- [wagmi](https://wagmi.sh)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Pinata](https://pinata.cloud/)

---

CanvaTrans is more than just a platform—it's a movement towards a future where creators are empowered, rewarded fairly, and connected with fans in meaningful ways. Join us in revolutionizing content sharing with Web3 technology!
