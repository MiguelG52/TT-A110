"use client";
import { useState } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
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
    const [name, setName] = useState("Juan Pérez");
    const [email, setEmail] = useState("juan.perez@example.com");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para actualizar datos del usuario (ejemplo: API call)
        setMessage("Perfil actualizado con éxito.");
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </main>
    );
}
