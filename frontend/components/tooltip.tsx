import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import React from 'react'

interface ITooltipProps {
    content: string | React.ReactNode
    children: React.ReactNode
}
const Tootltip = ({content, children}:ITooltipProps) => {
  return (
    <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                {content}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default Tootltip