// src/sections/PostView.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Post, User, PostImage } from "@prisma/client";
import { 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    IconButton, 
    Box, 
    TextField,
    Button,
    Avatar,
    Divider,
    Stack,
    Badge
} from "@mui/material";
import { 
    Favorite, 
    FavoriteBorder, 
    ChatBubbleOutline,
    Send,
    ArrowBackIos,
    ArrowForwardIos,
    BookmarkBorder, 
    Bookmark
} from "@mui/icons-material";
import { fetchPosts } from "@/app/actions/post_action";

// Define a type that includes the user relation
type PostWithUser = Post & {
    user: User;
    images: PostImage[]; // Include images relation
};

interface PostViewProps {
    post?: PostWithUser;
}

const PostView = () => {
    const [posts, setPosts] = useState<PostWithUser[]>([]);
    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        loadPosts();
    }, []);

    const handleLike = (postId: string) => {
        setLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const handleComment = (postId: string) => {
        // Here you would typically send the comment to your backend
        console.log(`Comment for post ${postId}:`, commentText[postId]);
        setCommentText(prev => ({ ...prev, [postId]: '' }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 3 }}>
            {posts.map((post) => (
                <Card key={post.id} sx={{ width: "70%", maxWidth: 600 }}>
                    <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={post.user.image || undefined} alt={post.user.name || 'User'} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {post.user.name || 'Anonymous'}
                        </Typography>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ 
                            height: 400,
                            objectFit: 'cover',
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                        image={post.images.length > 0 ? post.images[0].imageUrl : "/placeholder.jpg"} // ✅ Correct

                    />
                    <CardContent>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <IconButton onClick={() => handleLike(post.id)}>
                                {likedPosts.has(post.id) ? 
                                    <Favorite color="error" /> : 
                                    <FavoriteBorder />
                                }
                            </IconButton>
                            <IconButton>
                                <ChatBubbleOutline />
                            </IconButton>
                        </Stack>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {post.caption}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Add a comment..."
                                value={commentText[post.id] || ''}
                                onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                            />
                            <Button 
                                variant="contained" 
                                endIcon={<Send />}
                                onClick={() => handleComment(post.id)}
                                disabled={!commentText[post.id]}
                            >
                                Post
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default PostView;