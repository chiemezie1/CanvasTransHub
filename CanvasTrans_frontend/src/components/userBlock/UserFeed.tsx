'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Plus, Image as ImageIcon, Film, FileText, Loader2 } from 'lucide-react'
import { getUserTransactions, getUserBlocks, addTransactionToBlock } from "@/contracts/contractInteractions"
import { useAccount } from "wagmi"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Post {
  id: string;
  ipfsHash: string;
  title: string;
  content: string;
  type: string;
  likes: number;
  comments: number;
  timestamp: number;
  transBlock: number;
  blockCategory: string | null;
  blockId: string | null;
}

interface Block {
  id: string;
  name: string;
  category: string;
}

export default function UserFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { address, isConnected } = useAccount();
  const [showBlockDropdown, setShowBlockDropdown] = useState<{ [postId: string]: boolean }>({});
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      if (!isConnected || !address) {
        console.warn("Please connect your wallet first.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const userTransactions = await getUserTransactions(address);
        const formattedPosts = userTransactions.map((tx: any) => ({
          id: tx.id.toString(),
          ipfsHash: tx.ipfsHash || '',
          title: tx.title || "Untitled Post",
          content: tx.description || "No content provided.",
          type: Number(tx.mediaType) === 1 ? 'image' : Number(tx.mediaType) === 2 ? 'video' : 'text',
          transBlock: Number(tx.transBlock),
          likes: Number(tx.likes || 0),
          comments: 0,
          timestamp: Number(tx.timestamp) * 1000 || Date.now(),
          blockCategory: tx.blockCategory || null,
          blockId: tx.blockId || null,
        }));

        setPosts(formattedPosts);
        await fetchUserBlocks();
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserBlocks = async () => {
      if (!address) return;
      try {
        const userBlocks = await getUserBlocks(address);
        setBlocks(userBlocks.map(block => ({
          id: block.id.toString(),
          name: block.name,
          category: block.category
        })));
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };

    fetchUserTransactions();
  }, [isConnected, address]);

  const handleAddToBlockClick = (postId: string) => {
    setShowBlockDropdown(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleBlockSelect = async (selectedBlockId: string, postId: string) => {
    await addTransactionToBlock(BigInt(postId), BigInt(selectedBlockId));
    setShowBlockDropdown(prev => ({ ...prev, [postId]: false }));

    const selectedBlock = blocks.find(block => block.id === selectedBlockId);
    
    // Update post's block data locally
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { ...post, transBlock: Number(selectedBlockId), blockCategory: selectedBlock?.category || null, blockId: selectedBlockId } 
        : post
    ));
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
      case 'video': return <Film className="w-5 h-5 text-green-500 dark:text-green-400" />;
      case 'text': return <FileText className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
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
                    {new Date(post.timestamp).toLocaleDateString()}
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
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  {post.transBlock === 0 ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToBlockClick(post.id)}
                      className="flex items-center space-x-1 bg-transparent border-gray-300 dark:border-gray-600 text-primary dark:text-primary-light hover:bg-primary/10 dark:hover:bg-primary-light/10"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Block</span>
                    </Button>
                  ) : (
                    <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                      {post.blockCategory || 'Added to Block'}
                    </span>
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
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
