import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { IProjectCard } from '@/models/types'
import { Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

const ProjectCard = ({name, description, teams, projectId}:IProjectCard) => {
  return (
    <Card className="p-6">
      <CardContent className="p-0 mb-4">
          <h3 className="text-2xl font-bold mb-1">Proyecto: {name}</h3>
          <p className="text-gray-500 mb-6">{description}</p>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-blue-400" />
            <p>Equipo: </p>
              {teams.map((team, index)=> <span key={index}>{team.name}</span>)}
          </div>
      </CardContent>
      <CardFooter className="p-0">
          <Link href={`/project/${projectId}`} className="w-full">
                    <Button variant="secondary" className="w-full">
                      Ver Detalles
                    </Button>
          </Link>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard