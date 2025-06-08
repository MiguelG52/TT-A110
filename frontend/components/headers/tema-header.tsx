// components/tema/TemaHeader.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tema } from '@/lib/temario';

interface TemaHeaderProps {
  tema: Tema;
  onComplete: () => void;
}

export function TemaHeader({ tema, onComplete }: TemaHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Badge
            className="mb-2 capitalize"
            variant={
              tema.category === 'basico'
                ? 'default'
                : tema.category === 'intermedio'
                ? 'secondary'
                : tema.category === 'avanzado'
                ? 'destructive'
                : 'default'
            }
          >
            {tema.category}
          </Badge>
          <h1 className="text-3xl font-bold mb-2">
            {tema.icon && <span className="mr-2">{tema.icon}</span>}
            {tema.title}
          </h1>
          <p className="text-gray-600 mb-4">{tema.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-1" />
              {tema.content.exercises} ejercicios
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}