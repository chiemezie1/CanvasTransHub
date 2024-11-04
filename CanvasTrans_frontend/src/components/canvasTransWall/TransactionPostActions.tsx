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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TransactionPostActionsProps, Donor, Comment } from '@/types/types'

export default function TransactionPostActions({ item }: TransactionPostActionsProps) {
    const [donationAmount, setDonationAmount] = useState<string>('')
    const [showDonationInput, setShowDonationInput] = useState<boolean>(false)
    const [donors, setDonors] = useState<Donor[]>([])
    const [totalDonations, setTotalDonations] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [commentText, setCommentText] = useState<string>('')
    const [comments, setComments] = useState<Comment[]>([])
    const [showDonorList, setShowDonorList] = useState<boolean>(false)
    const [showComments, setShowComments] = useState<boolean>(false)

    const { address: connectedAccount, isConnected } = useAccount()

    const isCreator = isConnected && item.creator === connectedAccount

    const hasDonations = totalDonations > 0

    useEffect(() => {
        const fetchDonorsAndComments = async () => {
            setLoading(true)
            try {
                const transactionId = BigInt(item.id)
                const { donors, total } = await getDonorsAndDonations(transactionId)
                const donorsWithProfiles = await Promise.all(
                    donors.map(async (donor) => {
                        const profile = await getUserProfile(donor.address)
                        return {
                            ...donor,
                            name: profile ? profile[0] : 'Unknown',
                            profilePicture: profile ? profile[2] : '',
                        }
                    })
                )
                setDonors(donorsWithProfiles)
                setTotalDonations(total || 0)
                const fetchedComments = await getTransactionComments(transactionId)
                const commentsWithProfiles = await Promise.all(
                    fetchedComments.map(async (comment) => {
                        const profile = await getUserProfile(comment.commenter)
                        return {
                            ...comment,
                            name: profile ? profile[0] : 'Unknown',
                            profilePicture: profile ? profile[2] : '',
                        }
                    })
                )
                setComments(commentsWithProfiles)
            } catch (error) {
                console.error("Failed to fetch donors or comments:", error)
                setError("Failed to fetch data.")
            } finally {
                setLoading(false)
            }
        }

        fetchDonorsAndComments()
    }, [item.id])

    const handleDonateClick = async () => {
        if (!donationAmount || parseFloat(donationAmount) <= 0) {
            setError("Please enter a valid donation amount.")
            return
        }

        const txId = BigInt(item.id)
        const etherAmount = parseFloat(donationAmount)
        const donationAmountWei = BigInt(Math.floor(etherAmount * 1e18))

        setLoading(true)
        try {
            await donateToTransaction(txId, donationAmountWei)
            setDonationAmount('')
            setShowDonationInput(false)
            const { donors, total } = await getDonorsAndDonations(txId)
            const donorsWithProfiles = await Promise.all(
                donors.map(async (donor) => {
                    const profile = await getUserProfile(donor.address)
                    return {
                        ...donor,
                        name: profile ? profile[0] : 'Unknown',
                        profilePicture: profile ? profile[2] : '',
                    }
                })
            )
            setDonors(donorsWithProfiles)
            setTotalDonations(total || 0)
            setError(null)
        } catch (error) {
            console.error("Donation failed:", error)
            setError("Donation failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleLikeClick = async () => {
        const txId = BigInt(item.id)
        setLoading(true)
        try {
            await likeTransaction(txId)
            setError(null)
        } catch (error) {
            console.error("Like failed:", error)
            setError("Like failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleAddComment = async () => {
        if (!commentText) {
            setError("Please enter a comment.")
            return
        }

        const txId = BigInt(item.id)
        setLoading(true)
        try {
            await addComment(txId, commentText)
            setCommentText('')
            const fetchedComments = await getTransactionComments(txId)
            const commentsWithProfiles = await Promise.all(
                fetchedComments.map(async (comment, index) => {
                    const profile = await getUserProfile(comment.commenter)
                    return {
                        ...comment,
                        index: BigInt(index),
                        name: profile ? profile[0] : 'Unknown',
                        profilePicture: profile ? profile[2] : '',
                    }
                })
            )
            setComments(commentsWithProfiles)
            setError(null)
        } catch (error) {
            console.error("Failed to add comment:", error)
            setError("Failed to add comment. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteComment = async (index: bigint) => {
        const txId = BigInt(item.id)
        setLoading(true)
        try {
            await deleteComment(txId, index)
            const fetchedComments = await getTransactionComments(txId)
            const commentsWithProfiles = await Promise.all(
                fetchedComments.map(async (comment) => {
                    const profile = await getUserProfile(comment.commenter)
                    return {
                        ...comment,
                        name: profile ? profile[0] : 'Unknown',
                        profilePicture: profile ? profile[2] : '',
                    }
                })
            )
            setComments(commentsWithProfiles)
            setError(null)
        } catch (error) {
            console.error("Failed to delete comment:", error)
            setError("Failed to delete comment. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleWithdraw = async () => {
        setLoading(true)
        try {
            await withdrawDonations(BigInt(item.id))
            setTotalDonations(0)
            setError(null)
        } catch (error) {
            console.error("Withdrawal failed:", error)
            setError("Withdrawal failed. Please try again.")
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
                                <span>{(totalDonations / 1e18).toFixed(4)} ETH</span>
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
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{(donor.amount / 1e18).toFixed(4)} ETH</span>
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
            {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
        </div>
    )
}
