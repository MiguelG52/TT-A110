import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { ITeam } from '@/models/types'
import { getInitials } from '@/lib/utils'
import { Delete, Edit2Icon, Trash } from 'lucide-react'

const TeamCard = ({teamId, name, description, teamCodeId, members}:ITeam) => {
  

  return (
    
    <Card key={teamId} className="p-6">
      <CardContent className="p-0 mb-4">
        <div className='flex justify-between gap-2 items-center'>
          <h3 className="text-base xl:text-xl font-bold mb-1">{name}</h3>
          
          <div className='cursos'>
            <p className="text-blue-400 rounded-full text-sm p-1 px-3 bg-gray-200/90">{teamCodeId}</p>
          </div>
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
      <CardFooter className="p-0 flex flex-row justify-end gap-2">
            <Button variant="default" className="p-0 m-0 h-10 w-10 rounded-full shadow-lg hover:bg-blue-400 bg-blue-400/70">
              <span className="">
                <Edit2Icon className="h-10 w-10 rounded-full" />
              </span>
            </Button>
          <Button className="p-0 m-0 h-10 w-10 rounded-full shadow-lg border-red-500  bg-red-500/70 text-white hover:bg-red-500">
              <span className="">
                <Trash className=" h-10 w-10 rounded-full" />
              </span>
            </Button>
            
      </CardFooter>
    </Card>
  )
}

export default TeamCard