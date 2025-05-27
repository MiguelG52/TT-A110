// app/temario/[id]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import { TEMAS } from '@/lib/temario';
import { useToast } from '@/hooks/use-toast';
import { TemaHeader } from '@/components/headers/tema-header';
import { TemaTabs } from '../tabs/subjetTab';

export default function TemaPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const tema = TEMAS.find(t => t.id === params.id);

  if (!tema) return notFound();

  const marcarComoCompletado = () => {
    
    toast({
      title: "¡Tema completado!",
      description: "Has finalizado este tema exitosamente.",
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <TemaHeader 
        tema={tema} 
        onComplete={marcarComoCompletado}
      />
      
      <TemaTabs tema={tema} />
    </div>
  );
}