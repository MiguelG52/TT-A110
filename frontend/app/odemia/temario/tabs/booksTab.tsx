// components/tema/LibrosTab.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Libro } from '@/lib/temario';
interface LibrosTabProps {
  libros: Libro[];
}

export function LibrosTab({ libros }: LibrosTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {libros.map((libro) => (
        <Card key={libro.id} className="overflow-hidden">
          <div className="flex">
            <div className="w-32 flex-shrink-0 bg-gray-100 flex items-center justify-center">
              {libro.portada ? (
                <img src={libro.portada} alt={libro.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="text-gray-400 text-center p-4">Sin portada</div>
              )}
            </div>
            <div className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg">{libro.title}</CardTitle>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Autor:</strong> {libro.autor}</p>
                  <p><strong>Editorial:</strong> {libro.editorial}</p>
                  <p><strong>Año:</strong> {libro.year}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{libro.description}</p>
                {libro.enlace && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={libro.enlace} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver libro
                    </a>
                  </Button>
                )}
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}