import React from 'react'
import { Badge,  } from '../ui/badge'
import { Lightbulb, Wifi, WifiOff } from "lucide-react"
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type EditorHeaderProps = {
  isConnected:boolean
}
const EditorHeader = ({isConnected}:EditorHeaderProps) => {

  const handleGetRecommendations = () => {
    console.log("Recomendaciones chidas")
  }
  const connectedUsers = [
    {
      id: "1",
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: "2",
      name: "Bob Smith",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: "3",
      name: "Carlos López",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: "4",
      name: "Diana Martínez",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      id: "5",
      name: "Elena García",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    }
  ]
  

  return (
      <header className="flex items-center justify-between border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-blue-600">Editor de código</h1>
        <div className="flex items-center gap-4">
          {/* Connection status */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-600 border-green-200 flex items-center gap-1.5 px-2 py-1"
              >
                <Wifi className="h-3 w-3" />
                Conectado
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-red-50 text-red-600 border-red-200 flex items-center gap-1.5 px-2 py-1"
              >
                <WifiOff className="h-3 w-3" />
                Desconectado
              </Badge>
            )}
          </div>

          {/* Connected users */}
          {isConnected && connectedUsers.length > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {connectedUsers.slice(0, 3).map((user, i) => (
                        <Avatar key={user.id} className="h-6 w-6 border border-white">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-xs bg-gray-100">{user.name.charAt(0)}</AvatarFallback>
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
                  <p>Usuarios Conectadis: {connectedUsers.map((u) => u.name).join(", ")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <Button onClick={handleGetRecommendations} className="gap-2 bg-blue-600">
            <Lightbulb className="h-4 w-4 bg-blue-600 " />
            Obtener Recomendaciones
          </Button>
          
        </div>
    </header>    
  )
}

export default EditorHeader