import { AlertTriangle, CheckCircle2, Code, Lightbulb } from 'lucide-react'
import React from 'react'



   
const RecomendationCard = () => {
    const getColorByTipo = (tipo: string) => {
    switch (tipo) {
      case "mejora":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "optimizacion":
        return "bg-green-100 text-green-800"
      case "buenasPracticas":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case "mejora":
        return <Lightbulb className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      case "optimizacion":
        return <CheckCircle2 className="h-4 w-4" />
      case "buenasPracticas":
        return <Code className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "mejora":
        return "Mejora"
      case "error":
        return "Error"
      case "optimizacion":
        return "Optimización"
      case "buenasPracticas":
        return "Buenas Prácticas"
      default:
        return tipo
    }
  }

  
  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        
    </div>
  )
}

export default RecomendationCard