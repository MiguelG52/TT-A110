'use client'
import { TeamSkeleton } from '@/components/skeleton/TeamSkeleton'
import TeamCard from '@/components/team-card'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/authContext'
import { getTeamsByUserId } from '@/lib/actions/team-actions'
import { ITeam } from '@/models/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'


const TeamsTab = () => {
  const [teams, setTeams] = useState<ITeam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUser()
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 6
  })

  // Memoizar la función de fetch para evitar recreaciones innecesarias
  const fetchTeams = useCallback(async (page: number) => {
      try {
          if (user?.userId !== undefined) {
              setLoading(true)
              const result = await getTeamsByUserId(user.userId, page)
              
              if (!result.success) {
                  throw new Error(result.message || "Error al cargar equipos")
              }
              console.log(result.data.teams)
              setTeams(result.data.teams || [])
              setPagination(result.data.pagination || {
                  totalPages: 1,
                  totalItems: 0,
                  itemsPerPage: 6
              })
              setError(null)
          } else {
              throw new Error("El id del usuario está indefinido")
          }
      } catch (err: any) {
          setError(err.message || "Error al cargar equipos")
          setTeams([])
      } finally {
          setLoading(false)
      }
  }, [user?.userId]) // Dependencia: solo cambia cuando userId cambie

  useEffect(() => {
      fetchTeams(currentPage)
  }, [currentPage, fetchTeams])

  // Memoizar los botones de paginación para evitar rerenders innecesarios
  const paginationControls = useMemo(() => {
      if (pagination.totalPages <= 1) return null

      return (
          <div className="flex justify-center items-center gap-4 mt-8">
              <Button 
                  variant="outline" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
              >
                  Primera
              </Button>
              <Button 
                  variant="outline" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
              >
                  Anterior
              </Button>
              
              <span className="mx-2">
                  Página {currentPage} de {pagination.totalPages}
              </span>
              
              <Button 
                  variant="outline" 
                  disabled={currentPage === pagination.totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
              >
                  Siguiente
              </Button>
              <Button 
                  variant="outline" 
                  disabled={currentPage === pagination.totalPages}
                  onClick={() => setCurrentPage(pagination.totalPages)}
              >
                  Última
              </Button>
          </div>
      )
  }, [currentPage, pagination.totalPages])

  // Memoizar la lista de equipos renderizados
  const renderedTeams = useMemo(() => {
      if (loading) {
          return (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <TeamSkeleton count={pagination.itemsPerPage} />
              </div>
          )
      }

      if (teams.length === 0) {
          return (
              <div className="text-center py-8">
                  <p>No tienes equipos registrados</p>
              </div>
          )
      }

      return (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {teams.map((team) => (
                  <TeamCard 
                      key={team.teamId} 
                      {...team}
                  />
              ))}
          </div>
      )
  }, [loading, teams, pagination.itemsPerPage])

  if (error) return <p className="text-red-500 text-center py-8">{error}</p>

  return (
      <div className="space-y-6">
          {renderedTeams}
          {paginationControls}
      </div>
  )
}

export default TeamsTab