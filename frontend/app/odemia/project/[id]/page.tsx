'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ProjectHeader from './project-header'
import ProjectBody from './project-body'
import { useParams } from 'next/navigation'
import { IProject } from '@/models/types'
import { getAsyncAuth } from '@/lib/generalWebService'
import { methods } from '@/lib/endpoints'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState<IProject>({} as IProject)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  const fetchProject = useCallback(async () => {
    try {
      setLoading(true)
      const result = await getAsyncAuth(`${methods.projects.getById}/${id}`)
      if (!result.success) {
        throw new Error(result.message || "Error al cargar equipos")
      }
      setProject(result.data || {} as IProject)
      setError(null)
    } catch (error: any) {
      setError(error.message || 'Error al cargar el proyecto')
      setProject({} as IProject)
    } finally {
      setLoading(false)
    }
  }, [id])
  
  useEffect(() => {
    fetchProject()
  }, [fetchProject])

  if (error) return <p className="text-red-500 text-center py-8">{error}</p>
  
  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <p>Cargando</p>
      </div>
    )
  }

  return (
    <div>
      <ProjectHeader title={project?.name || ''} team={project?.team} projectId={project?.projectId} />
      <ProjectBody 
        description={project?.description || ''} 
        members={project?.members || []} 
      />
    </div>
  )
}

export default ProjectDetail