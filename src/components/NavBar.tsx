// src/components/NavBar.tsx

"use client";

import * as React from "react";
import { BottomNavigation, BottomNavigationAction, Box, Avatar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessRoundedIcon from '@mui/icons-material/SettingsBrightnessRounded';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "../components/ThemeProvider"; // Import the custom useTheme hook

export default function Navbar() {
  const [value, setValue] = React.useState("/");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toggleTheme, isDarkMode } = useTheme(); // Use theme context

  const handleNavigation = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(newValue);
  };

   // Paths for non-authenticated users (public paths)
   const publicPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "O nás", value: "/o-nas", icon: <InfoSharpIcon /> },
    {
      label: "Registrácia",
      value: "/auth/registracia",
      icon: <AppRegistrationIcon />,
    },
    { label: "Prihlásenie", value: "/auth/prihlasenie", icon: <LoginIcon /> },
  ];

  // Paths for authenticated users (private paths)
  const privatePaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladat", icon: <SearchIcon /> },
    { label: "Pridať", value: "/prispevok", icon: <AddCircleIcon /> },
    {
      label: "Profil",
      value: "/profil",
      icon: session?.user?.image ? (
        <Avatar>{session?.user?.name || "User"} src={session?.user?.image || undefined} </Avatar>
        ) : (
        <Avatar>{session?.user?.name?.charAt(0) || "U"}</Avatar>
      ),
    },
    { label: "Odhlásiť", value: "/auth/odhlasenie", icon: <LogoutIcon /> },
  ];

  // Select paths based on user authentication status
  const navigationPaths =
    status === "authenticated" ? privatePaths : publicPaths;

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation showLabels value={value} onChange={handleNavigation}>
        {navigationPaths.map((path) => (
          <BottomNavigationAction key={path.value} label={path.label} value={path.value} icon={path.icon} />
        ))}
      </BottomNavigation>
      {/* Theme Toggle Section */}
      <IconButton
        onClick={toggleTheme}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        {isDarkMode ? <LightModeIcon /> : <SettingsBrightnessRoundedIcon />}
      </IconButton>
    </Box>
);
}
