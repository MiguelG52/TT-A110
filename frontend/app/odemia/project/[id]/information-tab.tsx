import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Calendar, Users } from 'lucide-react'
import React from 'react'

const InformationTab = () => {
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
                    Este proyecto consiste en el desarrollo de una aplicación{" "}
                    
                    para gestión de tareas y colaboración en equipo. La aplicación permitirá a los usuarios crear
                    proyectos, asignar tareas, seguir el progreso y colaborar en tiempo real.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Estamos utilizando React  para el
                    frontend, Node.js para el backend y MongoDB como base de datos. El proyecto sigue una metodología
                    ágil con sprints de dos semanas.
                  </p>
                  <p className="text-gray-700">
                    El objetivo principal es mejorar la productividad y la comunicación dentro de los equipos de
                    trabajo. La aplicación incluirá características como gestión de tareas, chat en tiempo real,
                    integración con calendarios y notificaciones.
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
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Juan Díaz</p>
                      <p className="text-sm text-gray-500">Líder del Proyecto</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">María Rodríguez</p>
                      <p className="text-sm text-gray-500">Desarrolladora</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>CL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Carlos López</p>
                      <p className="text-sm text-gray-500">Diseñador</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información Adicional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Fecha de inicio: 15/04/2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Fecha estimada de finalización: 30/06/2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Miembros: 5 personas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </div>
        
    </>
  )
}

export default InformationTab