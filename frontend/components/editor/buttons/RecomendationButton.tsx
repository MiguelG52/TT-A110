
import { Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


interface RecommendationsButtonProps {
  onClick: () => void
  isLoading?: boolean
  showRecomendationsPanel?: boolean
}

export const RecommendationsButton = ({showRecomendationsPanel ,onClick, isLoading }: RecommendationsButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={onClick} 
            className="gap-2" 
            variant="secondary"
            disabled={isLoading}
          >
            <Lightbulb className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Obtener recomendaciones</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}