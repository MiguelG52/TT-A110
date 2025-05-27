'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CodeProps {
  code: string;
  language?: string;
}

export default function Code({ code, language = 'java' }: CodeProps) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Código copiado",
      description: "El código ha sido copiado al portapapeles",
      variant: "default",
    });
  };

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
        <span className="text-xs text-gray-300">{language}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-300 hover:text-white"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}