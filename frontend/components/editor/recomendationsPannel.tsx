import { RecommendationsPanelProps, Recommendation } from '@/models/types'
import { useState } from 'react'
import React from 'react'

type RecomendationProps = {
  recomendations:Recommendation
}

const RecommendationsPanel = ({recomendations}:RecomendationProps) => {
    return (
    <div>
      RecommendationsPanel
    </div>
  )
}

export default RecommendationsPanel