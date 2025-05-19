import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ITeamMember } from '@/models/types'
import { AvatarFallback } from '@radix-ui/react-avatar'
import React from 'react'

interface IInformationTabProps {
  description: string
  members: ITeamMember[]
}

const InformationTab = ({description, members}:IInformationTabProps) => {
  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Descripción del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-1">
                <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Equipo del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
              {members.map((member) => (
                <div key={member.userId} className="flex items-center gap-4 mb-4">
                  <Avatar className="h-10 w-10 bg-blue-400 text-white font-semibold flex items-center justify-center">
                    <AvatarFallback>{getInitials(member.name, member.lastName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{`${member.name} ${member.lastName}`}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
              ))}
            </CardContent>
              </Card>
            </div>
        </div>
        
    </>
  )
}

export default InformationTab