import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/assets/css/globals.css";

const geistSans = localFont({
    src: "./../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Perfil de Usuario | TTA-110",
    description: "Página de perfil de usuario en TTA-110",
};

export default function UserProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}>
            {children}
        </div>
    );
}