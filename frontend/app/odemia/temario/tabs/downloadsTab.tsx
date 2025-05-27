// components/tema/DescargasTab.tsx
'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { Descarga } from '@/lib/temario';
import { useToast } from '@/hooks/use-toast';

interface DescargasTabProps {
  descargas: Descarga[];
}

export function DescargasTab({ descargas }: DescargasTabProps) {
  const { toast } = useToast();

  const handleDescarga = (archivo: Descarga) => {
    toast({
      title: "Descarga iniciada",
      description: `Descargando ${archivo.name}...`,
      variant: "default",
    });
    // Lógica real de descarga aquí
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {descargas.map((archivo) => (
        <Card key={archivo.id}>
          <CardHeader>
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{archivo.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <span className="bg-gray-100 px-2 py-1 rounded">{archivo.type}</span>
                  <span>{archivo.size}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{archivo.description}</p>
            <Button 
              onClick={() => handleDescarga(archivo)} 
              className="w-full" 
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}