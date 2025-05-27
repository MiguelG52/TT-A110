// components/tema/TemaTabs.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tema } from '@/lib/temario';
import { ContenidoTab } from './contentTab';
import { RecursosTab } from './recursosTab';
import { VideosTab } from './videosTab';
import { LibrosTab } from './booksTab';
import { DescargasTab } from './downloadsTab';

interface TemaTabsProps {
  tema: Tema;
}

export function TemaTabs({ tema }: TemaTabsProps) {
  return (
    <Tabs defaultValue="contenido" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="contenido">Contenido</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="libros">Libros</TabsTrigger>
        <TabsTrigger value="descargas">Descargas</TabsTrigger>
        <TabsTrigger value="recursos">Recursos</TabsTrigger>
      </TabsList>

      <TabsContent value="contenido" className="mt-6">
        <ContenidoTab contenido={tema.content} />
      </TabsContent>

      <TabsContent value="videos" className="mt-6">
        <VideosTab videos={tema.videos} />
      </TabsContent>

      <TabsContent value="libros" className="mt-6">
        <LibrosTab libros={tema.books} />
      </TabsContent>

      <TabsContent value="descargas" className="mt-6">
        <DescargasTab descargas={tema.downloads} />
      </TabsContent>

      <TabsContent value="recursos" className="mt-6">
        <RecursosTab recursos={tema.recursos} />
      </TabsContent>
    </Tabs>
  );
}