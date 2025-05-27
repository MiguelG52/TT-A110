// components/TemarioHeader.tsx
'use client'

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface TemarioHeaderProps {
  titulo: string
  descripcion: string
}

export function TemarioHeader({ titulo, descripcion }: TemarioHeaderProps) {
  return (
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{titulo}</h1>
          <p className="text-gray-500">{descripcion}</p>
        </div>
    </div>
  )
}