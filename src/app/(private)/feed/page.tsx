// /src/app/(private)/feed/page.tsx

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PostView from "@/sections/PostView";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Box } from "@mui/material";

export const metadata = { title: "Príspevky | Instaphony" };

export default async function PostPage() {
  const session = await getServerSession(authOptions);

  return(
    <Container>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
          mb: 5
        }}
      >
        <Typography variant="h3" gutterBottom>
          Vitajte, {session?.user?.name}!
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: 20 }}>
          Zadus se tim feedem.
        </Typography>
      </Box>
      <PostView/>
    </Container>
  );
}