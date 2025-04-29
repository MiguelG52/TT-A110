import PaginationControls from '@/components/pagination-controller'
import ProjectCard from '@/components/project-card'
import { ProjectSkeleton } from '@/components/skeleton/ProjectsSkeleton'
import { useUser } from '@/context/authContext'
import { getProjectsByUserId } from '@/lib/actions/projects-actions'
import { IProjectCard } from '@/models/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const ProjectsTab = () => {
  const [projects, setProjects] = useState<IProjectCard[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUser()
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 6
  })

  const fetchProjects = useCallback(async (page:number)=>{
    try{
      if (user?.userId !== undefined) {
        setLoading(true)
        const result = await getProjectsByUserId(user.userId, page)

        if (!result.success) {
          throw new Error(result.message || "Error al cargar equipos")
        }
        setProjects(result.data || [])
        setPagination(result.pagination || {
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 6
        })
        setError(null)
      }
    }
    catch(error:any){
      setError(error.message || "Error al cargar equipos")
      setProjects([])
    }finally{
      setLoading(false)
    }
  },[user?.userId])

   useEffect(() => {
      fetchProjects(currentPage)
  }, [currentPage, fetchProjects])
  
  const renderedProjects = useMemo(() => {
    if (loading) {
      return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <ProjectSkeleton count={pagination.itemsPerPage} />
        </div>
      )
    }

    if (projects.length === 0) {
      return (
        <div className="text-center py-8">
          <p>No tienes equipos registrados</p>
        </div>
      )
    }

    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project) => (
          <ProjectCard 
            key={project.projectId} 
            {...project}
          />
        ))}
      </div>
    )
  }, [loading, projects, pagination.itemsPerPage])

  if (error) return <p className="text-red-500 text-center py-8">{error}</p>

  return (
    <div className="space-y-6">
        {renderedProjects}
        <PaginationControls
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
          className="mt-8"
        />
      </div>
  )
}

export default ProjectsTab