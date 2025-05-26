
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { IUser } from '@/models/models'
import { AvatarFallback } from '@radix-ui/react-avatar'


interface ConnectedUsersProps {
  users: IUser[]
}

export const ConnectedUsers = ({ users }: ConnectedUsersProps) => {
  if (users.length === 0) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="">
            <div className="">
              {users.slice(0, 3).map((user, i) => (
                  <Avatar key={user.userId} className="h-6 b w-6 border border-white">
                    <AvatarFallback className="text-xs bg-gray-200">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
              </div>
              {users.length > 3 && (
                  <Badge variant="outline" className="ml-1 bg-gray-100 text-xs">
                  +{users.length - 3}
                  </Badge>
              )}
            </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Usuarios Conectados: {users.map((u) => u.name).join(", ")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}