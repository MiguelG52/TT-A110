'use client'
import { AppSidebar } from '@/components/app-sidebar'
import BackButton from '@/components/backButton'
import LogoutButton from '@/components/logoutButton'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useUser } from '@/context/authContext'
import { IUser } from '@/models/models'
import React, { useEffect, useRef } from 'react'

const ClientLayout = ({user,children}: {user: IUser;children: React.ReactNode;}) => {
    const { updateUser } = useUser();
    const initialLoad = useRef(true);

    useEffect(() => {
        if (initialLoad.current && user) {
        updateUser(user);
        initialLoad.current = false;
        }
    }, [user, updateUser]);
  return (
    <div className="flex max-h-svh w-full">
                {/* Sidebar a la izquierda */}
                <AppSidebar />

                {/* Contenedor del contenido */}
                <div className="flex flex-col flex-1 min-h-screen w-full">
                    {/* Header con botón de menú */}
                    <header className="bg-blue-500 text-white p-4 shadow-md flex justify-between w-full">
                       <div className="flex items-center">
                            
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
                    <main className="h-full bg-gray-100 p-6 w-full">
                        <section className='w-full h-full overflow-y-auto flex flex-col items-left  bg-white p-6'>
                            <BackButton/>
                            {children}
                        </section>           
                    </main>
                </div>
            </div>
  )
}

export default ClientLayout