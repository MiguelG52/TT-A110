'use client';
import React from 'react'
import { Button } from './ui/button'
import { FileCode, UserPlus2, Users } from 'lucide-react'

interface IHomeHeader {
  setCreateProjectModalOpen: (open: boolean) => void
  setJoinTeamModalOpen: (open: boolean) => void
  setCreateTeamModalOpen: (open: boolean) => void
}

const HomeHeader = ({setCreateTeamModalOpen, setJoinTeamModalOpen, setCreateProjectModalOpen}: IHomeHeader) => {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center mb-8">
        <h1 className="text-4xl font-bold">Bienvenido</h1>
        <div className="flex gap-4 mt-5 md:mt-0">
          <Button
            variant='secondary'
            className='gap-2 p-2 md:px-4 md:py-2'
            onClick={() => setJoinTeamModalOpen(true)}
          >
            <UserPlus2 className="h-5 w-5" />
            <span className="hidden md:inline">Unirse al Equipo</span>
          </Button>
          <Button
            variant='secondary'
            className='gap-2 p-2 md:px-4 md:py-2'
            onClick={() => setCreateTeamModalOpen(true)}
          >
            <Users className="h-5 w-5" />
            <span className="hidden md:inline">Crear Equipo</span>
          </Button>
          <Button
            variant='secondary'
            className='gap-2 p-2 md:px-4 md:py-2'
            onClick={() => setCreateProjectModalOpen(true)}
          >
            <FileCode className="h-5 w-5" />
            <span className="hidden md:inline">Crear Proyecto</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomeHeader