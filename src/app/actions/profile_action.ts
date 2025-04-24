"use server";

// Import Prisma client
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

// Fetch user profile by user ID
export const fetchUserProfile = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        posts: {
          include: {
            images: true,
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Could not fetch user profile");
  }
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  data: {
    name?: string;
    bio?: string;
    location?: string;
    interests?: string[];
    avatarUrl?: string;
  }
) => {
  try {
    // First, update the user's basic info if name is provided
    if (data.name) {
      await prisma.user.update({
        where: { id: userId },
        data: { name: data.name },
      });
    }

    // Then, update or create the profile
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        bio: data.bio,
        location: data.location,
        interests: data.interests,
        avatarUrl: data.avatarUrl,
      },
      create: {
        userId,
        bio: data.bio,
        location: data.location,
        interests: data.interests || [],
        avatarUrl: data.avatarUrl,
      },
    });

    return profile;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Could not update user profile");
  }
}; 