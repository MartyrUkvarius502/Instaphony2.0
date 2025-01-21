// src/app/layout.tsx
"use client";

import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import Navbar from "../components/NavBar";
import ThemeProvider from "../components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
              <main style={{ flexGrow: 1 }}>
                {children}
              </main>
            </div>
          </ThemeProvider>
          <Navbar />
        </AuthProvider>
      </body>
    </html>
  );
}
