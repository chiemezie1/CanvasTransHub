'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, DollarSign, MessageSquare, MoreHorizontal } from 'lucide-react'
import {
    donateToTransaction,
    likeTransaction,
    getDonorsAndDonations,
    addComment,
    deleteComment,
    getTransactionComments,
    getUserProfile,
    withdrawDonations
} from "@/contracts/contractInteractions"
import { useAccount } from "wagmi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageAlert } from '@/components/MessageAlert'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TransactionPostActionsProps, Donor, Comment } from '@/types/types'

interface TransactionResult<T> {
    success: boolean;
    data?: T;
    message?: string;
}

interface RawDonor {
    address: `0x${string}`;
    amount: bigint;
}

interface RawComment {
    commenter: `0x${string}`;
    text: string;
    timestamp: bigint;
}

interface ApiDonor {
    address: string;
    amount: number;
}

interface ApiComment {
    commenter: string;
    text: string;
    timestamp: number;
}

export default function TransactionPostActions({ item }: TransactionPostActionsProps) {
    const [donationAmount, setDonationAmount] = useState<string>('')
    const [showDonationInput, setShowDonationInput] = useState<boolean>(false)
    const [donors, setDonors] = useState<Donor[]>([])
    const [totalDonations, setTotalDonations] = useState<bigint>(BigInt(0))
    const [loading, setLoading] = useState<boolean>(false)
    const [alertState, setAlertState] = useState<{ message: string; type: 'info' | 'success' | 'warning' | 'error' | null }>({ message: '', type: null })
    const [commentText, setCommentText] = useState<string>('')
    const [comments, setComments] = useState<Comment[]>([])
    const [showComments, setShowComments] = useState<boolean>(false)

    const { address: connectedAccount, isConnected } = useAccount()

    const isCreator = isConnected && item.creator === connectedAccount

    const hasDonations = totalDonations > BigInt(0)

    useEffect(() => {
        const fetchDonorsAndComments = async () => {
            setLoading(true)
            try {
                const transactionId = BigInt(item.id)
                const donorsResult: TransactionResult<{ donors: ApiDonor[]; total: number }> = await getDonorsAndDonations(transactionId)
                if (donorsResult.success && donorsResult.data) {
                    const { donors: fetchedDonors, total } = donorsResult.data
                    const donorsWithProfiles = await Promise.all(
                        fetchedDonors.map(async (donor: ApiDonor) => {
                            const profileResult = await getUserProfile(donor.address as `0x${string}`)
                            return {
                                address: donor.address as `0x${string}`,
                                amount: donor.amount,
                                name: profileResult.success && profileResult.data ? profileResult.data[0] : 'Unknown',
                                profilePicture: profileResult.success && profileResult.data ? profileResult.data[2] : '',
                            } as Donor
                        })
                    )
                    setDonors(donorsWithProfiles)
                    setTotalDonations(BigInt(total))
                } else {
                    setAlertState({ message: donorsResult.message || 'Failed to fetch donors', type: 'error' })
                }

                const commentsResult: TransactionResult<readonly ApiComment[]> = await getTransactionComments(transactionId)
                if (commentsResult.success && commentsResult.data) {
                    const commentsWithProfiles = await Promise.all(
                        commentsResult.data.map(async (comment: ApiComment, index: number) => {
                            const profileResult = await getUserProfile(comment.commenter as `0x${string}`)
                            return {
                                commenter: comment.commenter as `0x${string}`,
                                text: comment.text,
                                timestamp: BigInt(comment.timestamp),
                                index: BigInt(index),
                                name: profileResult.success && profileResult.data ? profileResult.data[0] : 'Unknown',
                                profilePicture: profileResult.success && profileResult.data ? profileResult.data[2] : '',
                            } as Comment
                        })
                    )
                    setComments(commentsWithProfiles)
                } else {
                    setAlertState({ message: commentsResult.message || 'Failed to fetch comments', type: 'error' })
                }
            } catch (error) {
                console.error("Failed to fetch donors or comments:", error)
                setAlertState({ message: "Failed to fetch data.", type: 'error' })
            } finally {
                setLoading(false)
            }
        }

        fetchDonorsAndComments()
    }, [item.id])

    const handleDonateClick = async () => {
        if (!isConnected) {
            setAlertState({ message: "Please connect your wallet to donate.", type: 'warning' })
            return
        }

        if (!donationAmount || parseFloat(donationAmount) <= 0) {
            setAlertState({ message: "Please enter a valid donation amount.", type: 'warning' })
            return
        }

        const txId = BigInt(item.id)
        const etherAmount = parseFloat(donationAmount)
        const donationAmountWei = BigInt(Math.floor(etherAmount * 1e18))

        setLoading(true)
        try {
            const result = await donateToTransaction(txId, donationAmountWei)
            if (result.success) {
                setDonationAmount('')
                setShowDonationInput(false)
                const donorsResult: TransactionResult<{ donors: ApiDonor[]; total: number }> = await getDonorsAndDonations(txId)
                if (donorsResult.success && donorsResult.data) {
                    const { donors: fetchedDonors, total } = donorsResult.data
                    const donorsWithProfiles = await Promise.all(
                        fetchedDonors.map(async (donor: ApiDonor) => {
                            const profileResult = await getUserProfile(donor.address as `0x${string}`)
                            return {
                                address: donor.address as `0x${string}`,
                                amount: donor.amount,
                                name: profileResult.success && profileResult.data ? profileResult.data[0] : 'Unknown',
                                profilePicture: profileResult.success && profileResult.data ? profileResult.data[2] : '',
                            } as Donor
                        })
                    )
                    setDonors(donorsWithProfiles)
                    setTotalDonations(BigInt(total))
                }
                setAlertState({ message: "Donation successful!", type: 'success' })
            } else {
                setAlertState({ message: result.message || 'Donation failed', type: 'error' })
            }
        } catch (error) {
            console.error("Donation failed:", error)
            setAlertState({ message: "Donation failed. Please try again.", type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const handleLikeClick = async () => {
        if (!isConnected) {
            setAlertState({ message: "Please connect your wallet to like.", type: 'warning' })
            return
        }
        const txId = BigInt(item.id)
        setLoading(true)
        try {
            const result = await likeTransaction(txId)
            if (result.success) {
                setAlertState({ message: "Transaction liked successfully!", type: 'success' })
            } else {
                setAlertState({ message: result.message || 'Like failed', type: 'error' })
            }
        } catch (error) {
            console.error("Like failed:", error)
            setAlertState({ message: "Like failed. Please try again.", type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const handleAddComment = async () => {
        if (!isConnected) {
            setAlertState({ message: "Please connect your wallet to comment.", type: 'warning' })
            return
        }

        if (!commentText) {
            setAlertState({ message: "Please enter a comment.", type: 'warning' })
            return
        }

        const txId = BigInt(item.id)
        setLoading(true)
        try {
            const result = await addComment(txId, commentText)
            if (result.success) {
                setCommentText('')
                const commentsResult: TransactionResult<readonly ApiComment[]> = await getTransactionComments(txId)
                if (commentsResult.success && commentsResult.data) {
                    const commentsWithProfiles = await Promise.all(
                        commentsResult.data.map(async (comment: ApiComment, index: number) => {
                            const profileResult = await getUserProfile(comment.commenter as `0x${string}`)
                            return {
                                commenter: comment.commenter as `0x${string}`,
                                text: comment.text,
                                timestamp: BigInt(comment.timestamp),
                                index: BigInt(index),
                                name: profileResult.success && profileResult.data ? profileResult.data[0] : 'Unknown',
                                profilePicture: profileResult.success && profileResult.data ? profileResult.data[2] : '',
                            } as Comment
                        })
                    )
                    setComments(commentsWithProfiles)
                }
                setAlertState({ message: "Comment added successfully!", type: 'success' })
            } else {
                setAlertState({ message: result.message || 'Failed to add comment', type: 'error' })
            }
        } catch (error) {
            console.error("Failed to add comment:", error)
            setAlertState({ message: "Failed to add comment. Please try again.", type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteComment = async (index: bigint) => {
        if (!isConnected) {
            setAlertState({ message: "Please connect your wallet to delete a comment.", type: 'warning' })
            return
        }
        const txId = BigInt(item.id)
        setLoading(true)
        try {
            const result = await deleteComment(txId, index)
            if (result.success) {
                const commentsResult: TransactionResult<readonly ApiComment[]> = await getTransactionComments(txId)
                if (commentsResult.success && commentsResult.data) {
                    const commentsWithProfiles = await Promise.all(
                        commentsResult.data.map(async (comment: ApiComment, index: number) => {
                            const profileResult = await getUserProfile(comment.commenter as `0x${string}`)
                            return {
                                commenter: comment.commenter as `0x${string}`,
                                text: comment.text,
                                timestamp: BigInt(comment.timestamp),
                                index: BigInt(index),
                                name: profileResult.success && profileResult.data ? profileResult.data[0] : 'Unknown',
                                profilePicture: profileResult.success && profileResult.data ? profileResult.data[2] : '',
                            } as Comment
                        })
                    )
                    setComments(commentsWithProfiles)
                }
                setAlertState({ message: "Comment deleted successfully!", type: 'success' })
            } else {
                setAlertState({ message: result.message || 'Failed to delete comment', type: 'error' })
            }
        } catch (error) {
            console.error("Failed to delete comment:", error)
            setAlertState({ message: "Failed to delete comment. Please try again.", type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    const handleWithdraw = async () => {
        if (!isConnected) {
            setAlertState({ message: "Please connect your wallet to withdraw.", type: 'warning' })
            return
        }
        setLoading(true)
        try {
            const result = await withdrawDonations(BigInt(item.id))
            if (result.success) {
                setTotalDonations(BigInt(0))
                setAlertState({ message: "Withdrawal successful!", type: 'success' })
            } else {
                setAlertState({ message: result.message || 'Withdrawal failed', type: 'error' })
            }
        } catch (error) {
            console.error("Withdrawal failed:", error)
            setAlertState({ message: "Withdrawal failed. Please try again.", type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLikeClick}
                        disabled={loading}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        <ThumbsUp className="h-5 w-5" />
                        <span>{Number(item.likes)}</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center space-x-1 text-gray-600 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400"
                            >
                                <DollarSign className="h-5 w-5" />
                                <span>{(Number(totalDonations) / 1e18).toFixed(4)} ETH</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72 bg-white dark:bg-gray-800">
                            {donors.map((donor, index) => (
                                <DropdownMenuItem key={index} className="flex items-center space-x-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://gateway.pinata.cloud/ipfs/${donor.profilePicture}`} alt={donor.name} />
                                        <AvatarFallback>{donor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span className="flex-grow">{donor.name}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{(Number(donor.amount) / 1e18).toFixed(4)} ETH</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        <MessageSquare className="h-5 w-5" />
                        <span>{comments.length}</span>
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                    {isCreator && hasDonations && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleWithdraw}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Withdraw
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDonationInput(!showDonationInput)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Donate
                    </Button>
                </div>
            </div>
            {showDonationInput && (
                <div className='flex justify-end items-end'>
                    <div className="max-w-96 flex items-center space-x-2">
                        <Input
                            type="number"
                            placeholder="Amount (ETH)"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="w-32 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        />
                        <Button onClick={handleDonateClick} disabled={loading}>
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                        <Button variant="ghost" onClick={() => setShowDonationInput(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
            {showComments && (
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Comments</h3>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="flex-grow text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700"
                        />
                        <Button onClick={handleAddComment} disabled={loading}>
                            {loading ? 'Adding...' : 'Comment'}
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.index?.toString()} className="flex items-start space-x-2 p-2 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://gateway.pinata.cloud/ipfs/${comment.profilePicture}`} alt={comment.name} />
                                        <AvatarFallback>{comment.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">{comment.name}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(Number(comment.timestamp) * 1000).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='bg-white dark:bg-gray-800'>
                                            <DropdownMenuItem onClick={() => handleDeleteComment(comment.index ?? BigInt(0))}>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
                        )}
                    </div>
                </div>
            )}
            {alertState.type && (
                <MessageAlert
                    message={alertState.message}
                    onClose={() => setAlertState({ message: '', type: null })}
                    type={alertState.type}
                />
            )}
        </div>
    )
}
