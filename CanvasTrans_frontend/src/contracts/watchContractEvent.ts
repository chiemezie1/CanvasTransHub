import { useWatchContractEvent } from 'wagmi';
import { ABI, deployedAddress } from "./deployed-contract";
import { useState } from 'react';

// Define types for each event's return value
type TransactionCreatedEvent = {
    transactionId: bigint;
    creator: `0x${string}`;
};

type BlockCreatedEvent = {
    blockId: bigint;
    owner: `0x${string}`;
};

type TransactionAddedToBlockEvent = {
    transactionId: bigint;
    blockId: bigint;
    owner: `0x${string}`;
};

type TransactionLikedEvent = {
    transactionId: bigint;
    liker: `0x${string}`;
};

type FollowedEvent = {
    user: `0x${string}`;
    follower: `0x${string}`;
};

type CommentAddedEvent = {
    transactionId: bigint;
    commenter: `0x${string}`;
    text: string;
};

type DonationMadeEvent = {
    transactionId: bigint;
    donor: `0x${string}`;
    amount: bigint;
};

type DonationsWithdrawnEvent = {
    creator: `0x${string}`;
    amount: bigint;
};

type BlockDetailsUpdatedEvent = {
    blockId: bigint;
    newName: string;
    newDescription: string;
};

// Function to listen for TransactionCreated event
export const useTransactionCreatedListener = () => {
    const [transactionCreated, setTransactionCreated] = useState<TransactionCreatedEvent | null>(null);

    useWatchContractEvent({
        address: deployedAddress,
        abi: ABI,
        eventName: 'TransactionCreated',
        onLogs: (logs) => {
            logs.forEach((log) => {
                const { transactionId, creator } = log.args as TransactionCreatedEvent;
                setTransactionCreated({ transactionId, creator });
            });
        },
    });

    return transactionCreated;
};

// Function to listen for BlockCreated event
export const useBlockCreatedListener = () => {
    const [blockCreated, setBlockCreated] = useState<BlockCreatedEvent | null>(null);

    useWatchContractEvent({
        address: deployedAddress,
        abi: ABI,
        eventName: 'BlockCreated',
        onLogs: (logs) => {
            logs.forEach((log) => {
                const { blockId, owner } = log.args as BlockCreatedEvent;
                setBlockCreated({ blockId, owner });
            });
        },
    });

    return blockCreated;
};

// Function to listen for TransactionAddedToBlock event
export const useTransactionAddedToBlockListener = () => {
    const [transactionAddedToBlock, setTransactionAddedToBlock] = useState<TransactionAddedToBlockEvent | null>(null);

    useWatchContractEvent({
        address: deployedAddress,
        abi: ABI,
        eventName: 'TransactionAddedToBlock',
        onLogs: (logs) => {
            logs.forEach((log) => {
                const { transactionId, blockId, owner } = log.args as TransactionAddedToBlockEvent;
                setTransactionAddedToBlock({ transactionId, blockId, owner });
            });
        },
    });

    return transactionAddedToBlock;
};

// Function to listen for TransactionLiked event
export const useTransactionLikedListener = () => {
    const [transactionLiked, setTransactionLiked] = useState<TransactionLikedEvent | null>(null);

    useWatchContractEvent({
        address: deployedAddress,
        abi: ABI,
        eventName: 'TransactionLiked',
        onLogs: (logs) => {
            logs.forEach((log) => {
                const { transactionId, liker } = log.args as TransactionLikedEvent;
                setTransactionLiked({ transactionId, liker });
            });
        },
    });

    return transactionLiked;
};

// Function to listen for Followed event
export const useFollowedListener = () => {
    const [followed, setFollowed] = useState<FollowedEvent | null>(null);

    useWatchContractEvent({
        address: deployedAddress,
        abi: ABI,
        eventName: 'Followed',
        onLogs: (logs) => {
            logs.forEach((log) => {
                const { user, follower } = log.args as FollowedEvent;
                setFollowed({ user, follower });
            });
        },
    });

    return followed;
};

// Function to listen for CommentAdded event
export const useCommentAddedListener = () => {
    const [commentAdded, setCommentAdded] = useState<CommentAddedEvent | null>(null);

    useWatchContractEvent({
        address: deployedAddress,
        abi: ABI,
        eventName: 'CommentAdded',
        onLogs: (logs) => {
            logs.forEach((log) => {
                const { transactionId, commenter, text } = log.args as CommentAddedEvent;
                setCommentAdded({ transactionId, commenter, text });
            });
        },
    });

    return commentAdded;
};

// Function to listen for DonationMade event
export const useDonationMadeListener = () => {
    const [donationMade, setDonationMade] = useState<DonationMadeEvent | null>(null);

    useWatchContractEvent({
        address: deployedAddress,
        abi: ABI,
        eventName: 'DonationMade',
        onLogs: (logs) => {
            logs.forEach((log) => {
                const { transactionId, donor, amount } = log.args as DonationMadeEvent;
                setDonationMade({ transactionId, donor, amount });
            });
        },
    });

    return donationMade;
};

// Function to listen for DonationsWithdrawn event
export const useDonationsWithdrawnListener = () => {
    const [donationsWithdrawn, setDonationsWithdrawn] = useState<DonationsWithdrawnEvent | null>(null);

    useWatchContractEvent({
        address: deployedAddress,
        abi: ABI,
        eventName: 'DonationsWithdrawn',
        onLogs: (logs) => {
            logs.forEach((log) => {
                const { creator, amount } = log.args as DonationsWithdrawnEvent;
                setDonationsWithdrawn({ creator, amount });
            });
        },
    });

    return donationsWithdrawn;
};

// Function to listen for BlockDetailsUpdated event
export const useBlockDetailsUpdatedListener = () => {
    const [blockDetailsUpdated, setBlockDetailsUpdated] = useState<BlockDetailsUpdatedEvent | null>(null);

    useWatchContractEvent({
        address: deployedAddress,
        abi: ABI,
        eventName: 'BlockDetailsUpdated',
        onLogs: (logs) => {
            logs.forEach((log) => {
                const { blockId, newName, newDescription } = log.args as BlockDetailsUpdatedEvent;
                setBlockDetailsUpdated({ blockId, newName, newDescription });
            });
        },
    });

    return blockDetailsUpdated;
};
