import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileCode } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface IProjectHeaderProps {
  title?: string
  projectId?: number
  team?: {
    teamId: string
    name: string
    description: string
  }
}

const ProjectHeader = ({ title = '', team, projectId }: IProjectHeaderProps) => {
  // Validación adicional para el team
  const teamName = team?.name || 'Sin equipo asignado'

  return (
    <div className='mb-4'>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl lg:text-3xl font-bold mb-4">Proyecto: {title}</h1>
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className="text-xs md:text-sm py-1 rounded-full border-blue-400 bg-blue-50"
            >
              {teamName}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link href={`/odemia/editor/${projectId}?temp=false`}>
            <Button variant="secondary" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              <p className='hidden md:block'>Abrir en Editor</p>
            </Button>
          </Link>
        </div>
      </div>    
    </div>
  )
}

export default ProjectHeader