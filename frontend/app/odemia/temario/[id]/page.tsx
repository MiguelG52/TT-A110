// app/temario/[id]/page.tsx
'use client';

import { temario } from '@/lib/temario';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function TemaPage({ params }: { params: { id: string } }) {
    const currentId = parseInt(params.id);
    const tema = temario.find((item) => item.id === currentId);

    if (!tema) return notFound();

    const prevTema = temario.find((t) => t.id === currentId - 1);
    const nextTema = temario.find((t) => t.id === currentId + 1);

    return (
        <div className="p-4 sm:p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
                {tema.icon} {tema.title}
            </h1>
            <p className="text-gray-600 text-center mb-6">{tema.description}</p>

            {/* Video centrado */}
            {tema.videoUrl && (
                <div className="aspect-video mb-6">
                    <iframe
                        className="w-full h-full rounded"
                        src={tema.videoUrl}
                        title={tema.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}

            <div className="text-base text-gray-800 whitespace-pre-line mb-10 px-2 sm:px-0">
                {tema.content}
            </div>

            {/* Navegación siguiente / anterior */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">
                {prevTema ? (
                    <Link
                        href={`/temario/${prevTema.id}`}
                        className="text-blue-500 hover:underline"
                    >
                        ← {prevTema.title}
                    </Link>
                ) : <span />}

                {nextTema ? (
                    <Link
                        href={`/temario/${nextTema.id}`}
                        className="text-blue-500 hover:underline text-right"
                    >
                        {nextTema.title} →
                    </Link>
                ) : <span />}
            </div>
        </div>
    );
}
