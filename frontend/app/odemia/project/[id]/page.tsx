'use client'
import React, { useState } from 'react'
import ProjectHeader from './project-header'
import ProjectBody from './project-body'
import { useParams } from 'next/navigation'
import { IProject } from '@/models/types'

const ProjectDetail = () => {
  const { id } = useParams()
  const [teams, setTeams] = useState<IProject[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  return (
    <>
      <ProjectHeader/>
      <ProjectBody/>
    </>
  )
}

export default ProjectDetail