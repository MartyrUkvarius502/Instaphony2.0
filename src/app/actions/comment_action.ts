// src/app/actions/comment_action.ts

"use server";

// Import Prisma client
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export const createComment = async (postId: string, userId: string, text: string) => {
    try {
        const newComment = await prisma.comment.create({
            data: {
                text,
                postId,
                userId, // You need to pass the userId when calling this function
            },
        });

        return newComment;
    } catch (error) {
        console.error("Error creating comment:", error);
        return null;
    }
};