// components/tema/RecursosTab.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, FileText, Video } from 'lucide-react';
import { Recurso } from '@/lib/temario';
import { Badge } from '@/components/ui/badge';

interface RecursosTabProps {
  recursos: Recurso[];
}

export function RecursosTab({ recursos }: RecursosTabProps) {
  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'articulo': return <FileText className="h-6 w-6 text-green-600" />;
      case 'tutorial': return <Video className="h-6 w-6 text-blue-600" />;
      case 'documentacion': return <BookOpen className="h-6 w-6 text-purple-600" />;
      default: return <BookOpen className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {recursos.map((recurso) => (
        <Card key={recurso.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-lg mr-4">
                  {getIcon(recurso.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{recurso.title}</h3>
                  <p className="text-gray-600">{recurso.description}</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {recurso.type}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" asChild>
                <a href={recurso.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}