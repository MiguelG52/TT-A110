import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@/context/authContext'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { BookOpen, Code, Users } from 'lucide-react'
import React from 'react'




const UserInformation = () => {

  const { user } = useUser()
  const initial = user?.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className="md:w-1/3">
            <Card className='h-full'>
              <CardHeader>
                <div className="flex flex-col items-center justify-center">
                  <Avatar className='mb-4 flex flex-col items-center justify-center h-14 w-14 rounded-full bg-blue-300'>
                    <AvatarFallback 
                    className="text-xl font-bold text-white"
                    >
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user?.name}</CardTitle>
                  <CardDescription className="text-center mt-1">
                    @{user?.username}
                    <div className="mt-1">{user?.email}</div>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Cursos completados</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Code className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Ejercicios resueltos</p>
                      <p className="text-2xl font-bold">42</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Equipos</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
  )
}

export default UserInformation