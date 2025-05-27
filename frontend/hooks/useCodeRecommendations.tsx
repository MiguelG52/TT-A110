import { methods } from '@/lib/endpoints';
import { useState } from 'react';

type RecommendationType = {
  type: string;
  title: string;
  description: string;
  code?: string;
  line: number;
  severity?: string;
};

export const useCodeRecommendations = () => {
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (javaCode: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${methods.recomendations.generate}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          javaCode
        })
      });

      if (!response.ok) {
        throw new Error('Error al obtener recomendaciones');
      }

      const data = await response.json();
      setRecommendations(data.recommendations || []);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    recommendations, 
    isLoading, 
    error, 
    getRecommendations,
    clearRecommendations: () => setRecommendations([]) 
  };
};