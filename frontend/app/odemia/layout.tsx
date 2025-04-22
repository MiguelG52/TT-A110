import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { verifySession } from "@/lib/verifySession";
import { UserProvider } from "@/context/authContext";
import BackButton from "@/components/backButton";
import LogoutButton from "@/components/logoutButton";


export default async function Home({
    children,
}: {
    children: React.ReactNode;
}) {
    const {user} = await verifySession();
    
    return (
        <UserProvider  user={user}>
            <SidebarProvider>
            <div className="flex min-h-screen w-full">
                {/* Sidebar a la izquierda */}
                <AppSidebar />

                {/* Contenedor del contenido */}
                <div className="flex flex-col flex-1 min-h-screen w-full">
                    {/* Header con botón de menú */}
                    <header className="bg-blue-500 text-white p-4 shadow-md flex justify-between w-full">
                       <div className="flex items-center">
                            <BackButton/>
                            <SidebarTrigger className="mr-4 text-white" />
                            <h1 className="text-xl font-bold">
                                Odemia
                            </h1>
                       </div>

                       <div>
                          <LogoutButton/>
                       </div>
                    </header>

                    {/* Contenido principal con ancho completo */}
                    <main className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-6 w-full">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
        </UserProvider>
    );
}
