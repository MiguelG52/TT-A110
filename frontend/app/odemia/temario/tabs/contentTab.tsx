// components/tema/ContenidoTab.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Code from '../code/code';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { Clock, Code as CodeIcon } from 'lucide-react';
import { ContenidoTema } from '@/lib/temario';

interface ContenidoTabProps {
  contenido: ContenidoTema;
  duracion?: string;
}

export function ContenidoTab({ contenido, duracion }: ContenidoTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className='col-span-2'>
            {/* Sección de Teoría */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Teoría</CardTitle>
                <p className="text-gray-600">Conceptos fundamentales sobre clases en Java</p>
              </CardHeader>
              <CardContent className="prose max-w-none">
                {contenido.theory.map((parrafo, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {parrafo}
                  </p>
                ))}

                {/* Sección de Sintaxis */}
                  {contenido.examples.length > 0 && (
                    <>
                      <h3 className='text-xl font-semibold mt-6 mb-4'>Sintaxis básica</h3>
                      <Code code={contenido.examples[0].code} />
                    </>
                  )}
              </CardContent>
            </Card>
      </div>
      <div>
        {/* Sección de Ejemplos Prácticos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ejemplos Prácticos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2">
                {contenido.examples.slice(1).map((ejemplo, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{ejemplo.explain}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4" asChild>
                <Link href="/editor">
                  <CodeIcon className="h-4 w-4 mr-2" />
                  Abrir en Editor
                </Link>
              </Button>
            </CardContent>
          </Card>

      </div>



      
    </div>
  );
}