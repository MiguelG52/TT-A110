
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SaveButtonProps {
  onSave?: () => void
}

export const SaveButton = ({ onSave }: SaveButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={onSave} className="gap-2" variant="secondary">
            <Save className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Guardar Cambios</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}