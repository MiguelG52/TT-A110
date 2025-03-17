import { Pencil, Key } from "lucide-react"; // Íconos para edición y cambio de contraseña

export default function UserProfilePage() {
    const user = {
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        role: "Administrador",
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-2xl space-y-6">
                {/* Tarjeta de Información del Usuario */}
                <div className="bg-white shadow-lg rounded-2xl p-6 relative">
                    <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* <p><strong>Rol:</strong> {user.role}</p> */}

                    {/* Botón de Editar */}
                    <a
                        href="/userProfile/edit"
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <Pencil size={20} />
                    </a>
                </div>

                {/* Tarjeta de Cambio de Contraseña */}
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
                    <p>Cambia tu contraseña para mejorar la seguridad de tu cuenta.</p>
                    <a
                        href="/userProfile/change-password"
                        className="mt-4 inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Key size={20} className="mr-2" />
                        Cambiar Contraseña
                    </a>
                </div>
            </div>
        </main>
    );
}
