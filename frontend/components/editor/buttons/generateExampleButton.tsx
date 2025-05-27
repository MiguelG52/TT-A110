
import {  WandSparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface GenerateExampleButtonProps {
  onGenerate?: () => void
}

export const GenerateExampleButton = ({ onGenerate }: GenerateExampleButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={onGenerate} className="gap-2" variant="secondary">
            <WandSparkles className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Generar ejemplo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}