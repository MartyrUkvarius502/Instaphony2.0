// /src/app/(private)/feed/page.tsx

import React from "react";
import { GetServerSideProps } from "next";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";


interface Post {
  imageUrl: string;
  caption: string;
  id: string;
}

interface User {
  name: string;
  posts: Post[];
}

interface Props {
  userData: User[];
  error: string | null;
}
const Posts = ({ userData, error }: Props) => {
  if (error) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          {error}
        </Typography>
      </Container>
    );
  }

  return(
    <Container>
      <Typography variant="h4" gutterBottom>
        Zadus se tim feedem
      </Typography>

      {/* Loop through the users and their posts */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={2}>
        {userData.map((user) =>
          user.posts.map((post) => (
            <Box key={post.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.imageUrl}
                  alt={post.caption}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.caption}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))
        )}
      </Box>
    </Container>
 );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/posts"); // Update to the correct API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return {
      props: {
        userData: data, // Pass the fetched data to the page
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        userData: [],
        error: "Failed to load posts.",
      },
    };
  }
};

export default Posts;

