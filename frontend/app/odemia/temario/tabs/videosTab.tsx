// components/tema/VideosTab.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Video } from '@/lib/temario';

interface VideosTabProps {
  videos: Video[];
}

export function VideosTab({ videos }: VideosTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <div className="relative aspect-video bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="rounded-full">
                <Play className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              {video.duration}
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-lg">{video.title}</CardTitle>
            <p className="text-sm text-gray-600">{video.description}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}