import StadisticSkeleton from '@/components/skeleton/StadisticSkeleton'
import SummaryCard from '@/components/cards/summary-card'
import { useUser } from '@/context/authContext'
import { getUserStadictics } from '@/lib/actions/user-actions'
import { ISummaryCard } from '@/models/types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const SummayTab = () => {
  const [stadistics, setStadistic] = useState<ISummaryCard>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const {user} = useUser()

  const fetchStadistics = useCallback(async()=>{
    try{
          if (user?.userId !== undefined) {
            setLoading(true)
            const result = await getUserStadictics(user.userId)
    
            if (!result.success) {
              throw new Error(result.message || "Error al cargar equipos")
            }
            
            setStadistic(result.data || [])
            setError(null)
          }
        }
        catch(error:any){
          setError(error.message || "Error al cargar equipos")
        }finally{
          setLoading(false)
        }
  },[user?.userId])

  useEffect(() => {
        fetchStadistics()
    }, [fetchStadistics])

  const renderedStadistics = useMemo(() => {
    if (loading) {
      return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <StadisticSkeleton count={2}/>
        </div>
      )
    }

    return (
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {stadistics && <SummaryCard title={stadistics.projects.title} total={stadistics.projects.total} diff={stadistics.projects.diff} diffText={stadistics.projects.diffText} />}
        {stadistics && <SummaryCard title={stadistics.teams.title} total={stadistics.teams.total} diff={stadistics.teams.diff} diffText={stadistics.teams.diffText} />}
      </div>
    )
  }, [loading, stadistics])

  if (error) return <p className="text-red-500 text-center py-8">{error}</p>
  return (
    <div className="space-y-6">
      {renderedStadistics}
    </div>
  )
}

export default SummayTab