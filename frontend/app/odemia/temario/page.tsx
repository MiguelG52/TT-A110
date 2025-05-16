'use client';

import Link from 'next/link';
import { useState } from 'react';

const temario = [
    { id: 1, icon: "📘", title: "Clases en Java", description: "Aprende a declarar y usar clases en Java." },
    { id: 2, icon: "🔒", title: "Acceso a miembros", description: "Controla el acceso a los atributos y métodos." },
    { id: 3, icon: "🏗️", title: "Constructores", description: "Crea objetos con constructores personalizados." },
    { id: 4, icon: "➕", title: "Sobrecarga de Constructores", description: "Define múltiples constructores para flexibilidad." },
    { id: 5, icon: "🧯", title: "Try-Catch", description: "Manejo de excepciones en Java." },
    { id: 6, icon: "🔗", title: "Relaciones entre Clases", description: "Asocia clases para modelar comportamientos complejos." },
    { id: 7, icon: "👪", title: "Herencia simple", description: "Hereda comportamientos de clases base." },
    { id: 8, icon: "🧩", title: "Composición", description: "Usa clases como componentes internos de otras." },
    { id: 9, icon: "🌀", title: "Polimorfismo", description: "Interfaz única para diferentes tipos de datos." },
    { id: 10, icon: "🔐", title: "Encapsulamiento", description: "Protege los datos dentro de una clase." },
];

const itemsPerPage = 4;

export default function TemarioPage() {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredTemario = temario.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTemario.length / itemsPerPage);

    const paginatedItems = filteredTemario.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="flex flex-col min-h-screen p-6 bg-white mt-8">
            <h1 className="text-2xl font-bold mb-4 text-center">Temario</h1>

            <input
                type="text"
                placeholder="Buscar temas..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                className="w-full max-w-md mx-auto p-2 border border-gray-300 rounded mb-6"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">
                {paginatedItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-md transition duration-200 flex flex-col justify-between">
                        <div>
                            <div className="text-4xl mb-2 text-center">{item.icon}</div>
                            <h2 className="font-semibold text-lg text-center">{item.title}</h2>
                            <p className="text-sm text-gray-600 text-center">{item.description}</p>
                        </div>
                        <Link
                            href={`/temario/${item.id}`}
                            className="mt-4 inline-block bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition"
                        >
                            Revisar tema
                        </Link>
                    </div>
                ))}
            </div>

            {filteredTemario.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No se encontraron temas.</p>
            )}

            <div className="flex justify-center mt-10 space-x-2">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border-2 rounded-l font-semibold ${currentPage === 1
                            ? 'bg-gray-200 text-gray-500 border-blue-300 cursor-not-allowed'
                            : 'bg-white text-blue-600 border-blue-500 hover:bg-blue-50'
                        }`}
                >
                    {"<"}
                </button>
                <span className="px-4 py-2 border-t-2 border-b-2 border-blue-500 text-blue-700 font-medium">
                    Página {currentPage} de {totalPages || 1}
                </span>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`px-4 py-2 border-2 rounded-r font-semibold ${currentPage === totalPages || totalPages === 0
                            ? 'bg-gray-200 text-gray-500 border-blue-300 cursor-not-allowed'
                            : 'bg-white text-blue-600 border-blue-500 hover:bg-blue-50'
                        }`}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}
