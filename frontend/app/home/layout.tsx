import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/assets/css/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

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
        <SidebarProvider>
            <div className="flex min-h-screen">
                {/* Sidebar a la izquierda */}
                <AppSidebar />

                {/* Contenedor del contenido */}
                <div className="flex flex-col flex-1 min-h-screen">
                    {/* Header con botón de menú */}
                    <header className="bg-blue-600 text-white p-4 shadow-md flex items-center">
                        <SidebarTrigger className="mr-4 text-white" />
                        <h1 className="text-xl font-bold">Odemia</h1>
                    </header>

                    {/* Contenido principal que ocupa toda la pantalla */}
                    {/* <main className="flex-1 bg-gray-100 p-6"> */}
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
