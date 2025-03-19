"use client";
import { useState, useEffect } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { WebService } from "@/service/generalWebService";
import "@/assets/css/globals.css";

const geistSans = localFont({
    src: "./../../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./../../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// export const metadata: Metadata = {
//     title: " Edicion de Usuario | TTA-110",
//     description: "Página de edicion de información de usuario en TTA-110",
// };

export default function EditProfilePage() {
    const [user, setUser] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const result = await WebService.putAsync("/api/user/update", user, "Perfil actualizado con éxito.");
        setMessage(result.message);
    };

    if (loading) return <p className="text-center">Cargando...</p>;

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    {message && <p className="text-sm text-green-500">{message}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </main>
    );
}