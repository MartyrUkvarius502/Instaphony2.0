
"use client";

import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from 'next/link';



// Custom Header Styling
const Header = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginBottom: theme.spacing(4),
  }));

  export default function AboutUsView() {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        {/* Header */}
        <Header variant="h4">About Us</Header>
  
        {/* Main Content */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" paragraph>
            Welcome to Instaphony!
          </Typography>
          <Typography variant="body1" paragraph>
            We are a team of passionate individuals dedicated to creating a platform where people can connect, share moments, and interact in meaningful ways. Our mission is to empower individuals through creativity, communication, and community.
          </Typography>
          <Typography variant="body1" paragraph>
            At Instaphony, we believe that technology should bring people closer, not further apart. Our platform allows users to express themselves freely, share content, and engage with others in a positive and supportive environment.
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for being a part of our community. We are excited to have you with us and look forward to growing together!
          </Typography>
          <Link href="https://www.instagram.com/">
            <p>Our instagram</p>
          </Link>
          <Link href="https://sk-sk.facebook.com/login/?next=https%3A%2F%2Fsk-sk.facebook.com%2F">
            <p>Our facebook</p>
          </Link>
          <Link href="/">
            <p>Some page</p>
          </Link>
        </Box>
      </Container>
    );
  }