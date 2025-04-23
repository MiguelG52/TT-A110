import { Home, List, UserCog2, SquareChevronRight } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
    {
        title: "Inicio",
        url: "/odemia/home",
        icon: Home,
    },
    {
        title: "Editor de Código",
        url: "/odemia/editor",
        icon: SquareChevronRight
    },
    {
        title: "Temario",
        url: "/odemia/temario",
        icon: List,
    },
    // {
    //     title: "Calendar",
    //     url: "#",
    //     icon: Calendar,
    // },
    // {
    //     title: "Search",
    //     url: "#",
    //     icon: Search,
    // },
    {
        title: "Perfil",
        url: "/odemia/userProfile",
        icon: UserCog2,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
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
    )
}
