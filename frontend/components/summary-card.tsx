import { IStat } from '@/models/types'
import React from 'react'
import { Card, CardContent } from './ui/card'

const SummaryCard = ({title, total,diff, diffText}:IStat) => {
  return (
    <Card className="p-4">
        <CardContent className="p-0">
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <p className="text-4xl text-blue-400 font-bold">{total}</p>
                <p className="text-sm text-gray-500">{diffText}</p>
        </CardContent>
    </Card>
  )
}

export default SummaryCard