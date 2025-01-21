"use client";

import {
  Button,
  Container,
  Typography,
} 
from "@mui/material";
import { signIn } from "next-auth/react"
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function SignInView() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Logo / Title */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Prihlásenie
      </Typography>

      {/* Sign-in Link */}
      <Typography variant="body1" sx={{ mb: 6 }}>
        Ešte nemáte účet? <a href="/auth/registracia">Registrujte sa</a>
      </Typography>

      {/* Google Sign Up */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => signIn("google")}
        sx={{ mb: 1 }}
      >
        Prihlásiť sa účtom Google
      </Button>
      
      {/* Github Sign Up */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GitHubIcon />}
        onClick={() => signIn("github")}
        sx={{ mb: 1 }}
      >
        Prihlásiť sa účtom Github
      </Button>
    </Container>
  );
}
