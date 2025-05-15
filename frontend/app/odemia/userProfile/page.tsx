"use client";
import { useState } from "react";
import UserInformation from "./userData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdatePasswordCard from "./updatePasswordCard";
import UpdateUserDataCard from "./userDataCard";

export default function UserProfilePage() {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <UserInformation/>
                <div className="md:w-2/3">
                    <Tabs defaultValue="datos" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="datos">Datos Personales</TabsTrigger>
                            <TabsTrigger value="password">Contraseña</TabsTrigger>
                        </TabsList>
                        <TabsContent value="datos">
                            <UpdateUserDataCard setIsLoading={setIsLoading} isLoading={isLoading}/>
                        </TabsContent>
                        <TabsContent value="password">
                            <UpdatePasswordCard/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            
        </>
    );
}
