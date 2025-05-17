import { SidebarProvider } from "@/components/ui/sidebar"
import { verifySession } from "@/lib/verifySession";
import { UserProvider } from "@/context/authContext";
import ClientLayout from "./client-layot";


export default async function Home({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = await verifySession();

    return (
        <UserProvider initialUser={user}>
            <SidebarProvider>
                <ClientLayout user={user}>
                    {children}
                </ClientLayout>
            </SidebarProvider>
        </UserProvider>
    );
}
