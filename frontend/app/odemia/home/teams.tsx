'use client'
import PaginationControls from '@/components/pagination-controller'
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
  
    const fetchTeams = useCallback(async (page: number) => {
      try {
        if (user?.userId !== undefined) {
          setLoading(true)
          const result = await getTeamsByUserId(user.userId, page)
          
          if (!result.success) {
            throw new Error(result.message || "Error al cargar equipos")
          }
          
          setTeams(result.data || [])
          setPagination(result.pagination || {
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
    }, [user?.userId])
  
    useEffect(() => {
      fetchTeams(currentPage)
    }, [currentPage, fetchTeams])
  
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
        <PaginationControls
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
          className="mt-8"
        />
      </div>
    )
  }
  
  export default TeamsTab