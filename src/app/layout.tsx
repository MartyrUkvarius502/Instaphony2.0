// src/app/layout.tsx

import { Metadata } from "next";
import "./globals.css";

import AuthProvider from "../components/AuthProvider";
import Navbar from "../components/NavBar";

import ThemeProvider from "../components/ThemeProvider"; // Import the ThemeProvider

export const metadata: Metadata = {
  title: "Instaphony",
  description: "Created by students of SPŠE Zochova 9, Bratislava",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
              <main style={{ flexGrow: 1 }}>
                {children} {/* Render child layouts or pages */}
              </main>
            </div>
            <Navbar /> {/* Display Navbar at the bottom of every page */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
