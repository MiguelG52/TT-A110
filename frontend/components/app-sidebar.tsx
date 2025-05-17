"use client";

import { useState } from "react";
import { Home, List, UserCog2, SquareChevronRight, Menu } from "lucide-react";
import Link from "next/link";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
    { title: "Inicio", url: "/odemia/home", icon: Home },
    { title: "Editor de Código", url: "/odemia/editor", icon: SquareChevronRight },
    { title: "Temario", url: "/odemia/temario", icon: List },
    { title: "Perfil", url: "/odemia/userProfile", icon: UserCog2 },
];

export function AppSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Botón para móviles */}
            <button
                onClick={() => setOpen(!open)}
                className="sm:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
            >
                <Menu />
            </button>

            {/* Fondo oscuro en móvil cuando el menú está abierto */}
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar responsive */}
            <div
                className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 sm:static sm:block
        `}
            >
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Application</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url} onClick={() => setOpen(false)}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </div>
        </>
    );
}
