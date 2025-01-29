// src/app/(home)/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";


export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // If the user is logged in, redirect to the feed page
      router.push("/feed");
    }
  }, [session, router]);

  return (

  <Typography> This is the home page. Welcome welcome. </Typography>

  );
}

























