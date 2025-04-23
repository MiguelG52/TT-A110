'use client';
import React from 'react'
import { Button } from './ui/button'
import { FileCode, UserPlus2, Users } from 'lucide-react'

interface IHomeHeader{
  setCreateProjectModalOpen: (open: boolean) => void
  setJoinTeamModalOpen: (open: boolean) => void
  setCreateTeamModalOpen: (open: boolean) => void
}
const HomeHeader = ({setCreateTeamModalOpen, setJoinTeamModalOpen, setCreateProjectModalOpen}:IHomeHeader) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Bienvenido</h1>
        <div className="flex gap-4">
          <Button
            variant='secondary'
            className='gap-2 p-5'
            onClick={() => setJoinTeamModalOpen(true)}
          >
            <UserPlus2 className="h-5 w-5" />
            Unirse al Equipo
          </Button>
          <Button
            variant='secondary'
            className='gap-2 p-5'
            onClick={() => setCreateTeamModalOpen(true)}
          >
            <Users className="h-5 w-5" />
            Crear Equipo
          </Button>
          <Button
            variant='secondary'
            className='gap-2 p-5'
            onClick={() => setCreateProjectModalOpen(true)}
          >
            <FileCode className="h-5 w-5" />
            Crear Proyecto
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomeHeader