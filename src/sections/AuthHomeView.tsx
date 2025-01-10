// src/sections/AuthHomeView.tsx

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Session } from "next-auth";

export default function AuthHomeView({ session }: { session: Session }) {

  return (
    <Container>
      <Typography>Homepage | User signed in</Typography>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Vitajte, {session?.user?.name || "užívateľ"}!
      </Typography>
    </Container>
  );
}



