import BackButton from '@/components/backButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileCode } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ProjectHeader = () => {
  return (
    <div>
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold mb-4">Proyecto</h1>
                <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm py-1 rounded-full border-blue-400 bg-blue-50">
                    Aplicación 
                </Badge>
                <span className="text-gray-500 text-sm">Equipo</span>
                </div>
            </div>
        
            <div className="flex gap-3">
                <Link href="/odemia/editor">
                <Button variant="secondary" className="flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    Abrir en Editor
                </Button>
                </Link>
            </div>
        </div>    
    </div>
  )
}

export default ProjectHeader