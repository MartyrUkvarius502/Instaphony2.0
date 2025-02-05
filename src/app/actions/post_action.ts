// src/app/actions/post_action.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch posts from the database
export async function getPosts() {
  try {
    // Query the database to fetch users and their posts
    const posts = await prisma.user.findMany({
      include: {
        posts: true, // Include posts for each user
      },
    });

    // Map the data to a desired format (if needed)
    const userData = posts.map((user) => ({
      name: user.name,
      posts: user.posts.map((post) => ({
        id: post.id,
        imageUrl: post.imageUrl,
        caption: post.caption,
      })),
    }));

    return userData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Error fetching posts");
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is disconnected
  }
}

