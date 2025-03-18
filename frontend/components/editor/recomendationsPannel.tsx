import { RecommendationsPanelProps, Recommendation } from '@/models/types'
import { useState } from 'react'
import React from 'react'

const RecommendationsPanel = ({ code, isVisible, onClose, isConnected }: RecommendationsPanelProps) => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([])
    const [loading, setLoading] = useState(false)

    return (
    <div>RecommendationsPanel</div>
  )
}

export default RecommendationsPanel