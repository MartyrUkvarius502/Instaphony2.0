// src/app/(home)/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NonAuthHomeView from "@/sections/NonAuthHomeView";


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

  <NonAuthHomeView></NonAuthHomeView>

  );
}


























