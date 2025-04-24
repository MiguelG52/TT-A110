import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { ITeam } from '@/models/types'
import { getInitials } from '@/lib/utils'

const TeamCard = ({teamId, name, description, teamCodeId, members}:ITeam) => {
  
  console.log(members)

  return (
    
    <Card key={teamId} className="p-6">
      <CardContent className="p-0 mb-4">
        <div className='flex justify-between items-center'>
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          <p className="text-gray-500 text-sm mb-6">{teamCodeId}</p>
        </div>
        <p className="text-gray-500 mb-6">{description}</p>

        <div className="flex -space-x-2 mb-4">
          {members?.slice(0, 4).map((member, i) => (
            <Avatar key={`${teamId}-${member.userId || i}`} className="border-2 border-white w-10 h-10">
              <AvatarFallback className="bg-gray-200">
                {getInitials(member.user?.username)}
              </AvatarFallback>
            </Avatar>
          ))}
          {members && members.length > 4 && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border-2 border-white text-sm">
              +{members.length - 4}
            </div>
          )}
          {(!members || members.length === 0) && (
            <div className="text-gray-400 text-sm">No hay miembros</div>
          )}
        </div>

      </CardContent>
      <CardFooter className="p-0">
        <Button variant="outline" className="w-full">
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  )
}

export default TeamCard