"use client";
import { useEffect, useState } from "react";
import { WebService } from "@/service/generalWebService";
import { Pencil, Key } from "lucide-react";

export default function UserProfilePage() {
    const [user, setUser] = useState({ name: "", email: "", role: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            const result = await WebService.getAsync("/api/user");
            if (result.success) {
                setUser(result.response);
            }
            setLoading(false);
        }

        fetchUserData();
    }, []);

    if (loading) return <p className="text-center">Cargando...</p>;

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 relative">
                <h2 className="text-xl font-semibold mb-4">Perfil</h2>

                <div className="space-y-2">
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Rol:</strong> {user.role}</p>
                </div>

                <a href="/userProfile/edit" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <Pencil size={20} />
                </a>

                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">Seguridad</h3>
                    <p className="text-sm text-gray-600">Cambia tu contraseña para mejorar la seguridad de tu cuenta.</p>
                    <a href="/userProfile/change-password" className="mt-3 inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <Key size={20} className="mr-2" />
                        Cambiar Contraseña
                    </a>
                </div>
            </div>
        </main>
    );
}
