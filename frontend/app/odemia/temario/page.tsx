// app/temario/page.tsx
'use client'

import { useState } from "react"
import { Tema, TEMAS } from "@/lib/temario"
import { TemarioHeader } from "@/components/headers/temario-header"
import { TemarioTabs } from "./tabs"

export default function TemarioPage() {
  const [selectedTab, setSelectedTab] = useState("todos")



  return (
    <div className="container mx-auto p-4">
      <TemarioHeader
        titulo="Programación Orientada a Objetos"
        descripcion="Curso completo de POO con Java"
      />

      <TemarioTabs
        temas={TEMAS}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />
    </div>
  )
}