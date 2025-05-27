import { Recommendation } from '@/models/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertTriangle, CheckCircle2, Code, Lightbulb } from 'lucide-react';
import { Button } from '../ui/button';

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
}

const RecommendationsPanel = ({ recommendations }: RecommendationsPanelProps) => {
  const getColorByType = (type: string) => {
    switch (type) {
      case "improvement": return "bg-blue-100 text-blue-800";
      case "error": return "bg-red-100 text-red-800";
      case "optimization": return "bg-green-100 text-green-800";
      case "bestPractice": return "bg-purple-100 text-purple-800";
      case "security": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case "improvement": return <Lightbulb className="h-4 w-4" />;
      case "error": return <AlertTriangle className="h-4 w-4" />;
      case "optimization": return <CheckCircle2 className="h-4 w-4" />;
      case "bestPractice": return <Code className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "improvement": return "Mejora";
      case "error": return "Error";
      case "optimization": return "Optimización";
      case "bestPractice": return "Buenas Prácticas";
      case "security": return "Seguridad";
      default: return type;
    }
  };

  return (
    <div className="space-y-4 overflow-y-scroll h-full p-4">
      {recommendations.length > 0 ? (
        recommendations.map((recommendation,index) => (
          <Card 
            key={index}
            className="border-l-4"
            style={{
              borderLeftColor: getColorByType(recommendation.type)
                .split(" ")[0]
                .replace("bg-", "")
                .replace("100", "500")
            }}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <Badge className={`${getColorByType(recommendation.type)} flex items-center gap-1`}>
                  {getIconByType(recommendation.type)}
                  {getTypeLabel(recommendation.type)}
                </Badge>
                <span className="text-xs text-gray-500">Línea {recommendation.line}</span>
              </div>
              <CardTitle className="text-base mt-2">{recommendation.title}</CardTitle>
              <CardDescription className="mt-1">{recommendation.description}</CardDescription>
            </CardHeader>
            {recommendation.code && (
              <CardContent className="p-4 pt-0">
                <pre className="bg-gray-50 p-3 rounded-md text-sm overflow-x-auto">
                  {recommendation.code}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => console.log("Aplicar recomendación", recommendation)}
                >
                  Aplicar recomendación
                </Button>
              </CardContent>
            )}
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Lightbulb className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-2">No hay recomendaciones</h3>
          <p className="text-gray-500 mb-4">
            Haz clic en "Obtener Recomendaciones" para analizar tu código.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPanel;