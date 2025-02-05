// /src/app/(private)/feed/page.tsx


import { getPosts } from "../../actions/post_action";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

export default async function FeedPage() {
  // Fetch posts using the getPosts function from actions/post_action.ts
  const userData = await getPosts();
  
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
                  alt={post.caption || "No caption"}
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
