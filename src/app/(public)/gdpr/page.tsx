// src/app/(public)/gdpr/page.tsx

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import GDPRView from "@/sections/GDPRView";


export const metadata = { title: "GDPR | Instaphony" };


export default function GDPR() {
    
    return (
        <GDPRView></GDPRView>
    );
    
}
