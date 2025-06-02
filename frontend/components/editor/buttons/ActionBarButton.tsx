
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'

interface ActionBarButtonProps {
  onHandleButton?: () => void
  icon?: React.ReactNode,
  text:string
  handleFileChange?: (event:React.ChangeEvent<HTMLInputElement>) => void;
  isInput?: boolean;
}

const ActionBarButton = ({icon, onHandleButton, text, isInput, handleFileChange}:ActionBarButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          
          <Button onClick={onHandleButton} className="gap-2" variant="secondary">
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ActionBarButton