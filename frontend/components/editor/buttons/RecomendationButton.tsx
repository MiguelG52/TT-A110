import { Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RecommendationsButtonProps {
  onClick: () => void
  isLoading?: boolean
  showRecommendationsPanel?: boolean
  hasRecommendations?: boolean
  recommendationsCount?: number
}

export const RecommendationsButton = ({
  showRecommendationsPanel,
  hasRecommendations,
  recommendationsCount = 0,
  onClick, 
  isLoading 
}: RecommendationsButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Button 
              onClick={onClick} 
              className={cn(
                "gap-2 relative flex w-full",
                showRecommendationsPanel && "bg-accent/50",
                hasRecommendations && "pr-8"
              )} 
              variant="secondary"
              disabled={isLoading}
            >
              <Lightbulb className="h-4 w-4" />
              {isLoading ? "Generando..." : "Recomendaciones"}
              
              {hasRecommendations && (
                <span className="">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "h-5 w-5 p-0 flex items-center justify-center text-xs",
                      showRecommendationsPanel 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-muted text-foreground"
                    )}
                  >
                    {recommendationsCount > 9 ? "9+" : recommendationsCount}
                  </Badge>
                </span>
              )}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isLoading 
              ? "Generando recomendaciones..." 
              : hasRecommendations 
                ? `${recommendationsCount} recomendaciones disponibles`
                : "Obtener recomendaciones de Clean Code"}
          </p>
          {showRecommendationsPanel && (
            <p className="text-muted-foreground text-xs mt-1">
              Panel de recomendaciones visible
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}