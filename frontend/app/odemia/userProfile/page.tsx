"use client";
import { useEffect, useState } from "react";
import { Pencil, Key } from "lucide-react";
import { useUser } from "@/context/authContext";
import Link from "next/link";

export default function UserProfilePage() {
    const [loading, setLoading] = useState(true);
    
    const {user} = useUser(); 

    useEffect(() => {
        console.log(user)
        setLoading(false);
    }, []);

    if (loading) return <p className="text-center">Cargando...</p>;
    if (!user) return <p className="text-center">Usuario no encontrado.</p>;

    return (
        <section className="flex-1 w-full h-full flex flex-col items-left justify-up bg-white p-6">
                <div>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl font-semibold mb-4">Perfil: {user.username}</h2>
                        <Link href="/odemia/userProfile/edit" className=" right-4 text-gray-500 hover:text-gray-700">
                            <Pencil size={20} />
                        </Link>
                    </div>

                    <div className="space-y-2">
                        <p><strong>Nombre:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Rol:</strong> {user.roleId === 2 ? "Profesor": user.roleId === 3 ? "Alumno":"Administrador"}</p>
                    </div>

                </div>
                

                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">Seguridad</h3>
                    <p className="text-sm text-gray-600">Cambia tu contraseña para mejorar la seguridad de tu cuenta.</p>
                    <Link href="/odemia/userProfile/change-password" className="mt-3 inline-flex items-center bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-400/90 transition">
                        <Key size={20} className="mr-2" />
                        Cambiar Contraseña
                    </Link>
                </div>
        </section>
    );
}
