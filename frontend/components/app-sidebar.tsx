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
import { generateTempId } from "@/lib/generateID";

const items = [
    { title: "Inicio", url: "/odemia/home", icon: Home },
    { title: "Editor de Código", url: ``, icon: SquareChevronRight },
    { title: "Temario", url: "/odemia/temario", icon: List },
    { title: "Perfil", url: "/odemia/userProfile", icon: UserCog2 },
];

export function AppSidebar() {
   const [editorId] = useState(() => generateTempId());
    return (
        <>
                <Sidebar variant="sidebar">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Application</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.title === "Editor de Código" 
                                                ? `/odemia/editor/${editorId}?temp=true` 
                                                : item.url
                                              } 
                                            ><item.icon />
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

        </>
    );
}
