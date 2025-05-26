import React from 'react'
import { IUser } from '@/models/models'
import { Recommendation } from '@/models/types'
import { SaveButton } from './buttons/saveButton'
import { GenerateExampleButton } from './buttons/generateExampleButton'
import { ConnectionStatusBadge } from './buttons/connectionStatusBadge'
import { ConnectedUsers } from './buttons/ConnectedUsers'
import { RecommendationsButton } from './buttons/RecomendationButton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'

type EditorHeaderProps = {
  isConnected:boolean
  isTemporary?:boolean
  connectedUsers:IUser[]
  isLoading: boolean,
  handleRecommmentations: () => void
  recomendations: Recommendation
  showRecomendationsPanel?: boolean
}
const EditorHeader = ({showRecomendationsPanel,isConnected, handleRecommmentations, isLoading, recomendations,  isTemporary,connectedUsers}:EditorHeaderProps) => {



  return (
    <header className="flex items-center justify-between my-4">
      <div className='flex items-center gap-2'>
        <SaveButton onSave={()=>console.log("save")} />
        <GenerateExampleButton onGenerate={()=>console.log("generate example")} />
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <ConnectionStatusBadge isConnected={isConnected} />
        
        {!isTemporary && isConnected && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="">
                  <div className="">
                    {connectedUsers.slice(0, 3).map((user, i) => (
                        <Avatar key={user.userId} className="h-6 b w-6 border border-white">
                          <AvatarFallback className="text-xs bg-gray-200">{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                    </div>
                    {connectedUsers.length > 3 && (
                        <Badge variant="outline" className="ml-1 bg-gray-100 text-xs">
                        +{connectedUsers.length - 3}
                        </Badge>
                    )}
                  </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Usuarios Conectados: {connectedUsers.map((u) => u.name).join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <RecommendationsButton 
          onClick={handleRecommmentations}
          isLoading={isLoading}

        />
      </div>
    </header>
  )
}

export default EditorHeader