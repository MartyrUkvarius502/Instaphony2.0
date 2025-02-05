// src/sections/NonAuthHomeView.tsx

import { Container, Typography } from "@mui/material";

export default function NonAuthHomeView() {
  return (
    <Container>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Homepage - No user signed in
      </Typography>
    </Container>
  );
}

