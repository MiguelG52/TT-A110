// components/TemarioTabs.tsx
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tema } from "@/lib/temario"
import { TemaCard } from "@/components/cards/temarioc-card"

interface TemarioTabsProps {
  temas: Tema[]
  selectedTab: string
  onTabChange: (value: string) => void
}

export function TemarioTabs({ temas, selectedTab, onTabChange }: TemarioTabsProps) {
  const filteredTemas = selectedTab === "todos" ? temas : temas.filter((tema) => tema.category === selectedTab)

  return (
    <Tabs defaultValue="todos" className="mb-6" onValueChange={onTabChange}>
      <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 mb-6">
        <TabsTrigger
          value="todos"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
        >
          Todos
        </TabsTrigger>
        <TabsTrigger
          value="basico"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
        >
          Básico
        </TabsTrigger>
        <TabsTrigger
          value="intermedio"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
        >
          Intermedio
        </TabsTrigger>
        <TabsTrigger
          value="avanzado"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-4 py-2"
        >
          Avanzado
        </TabsTrigger>
      </TabsList>

      {['todos', 'basico', 'intermedio', 'avanzado'].map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemas.map((tema) => (
              <TemaCard key={tema.id} tema={tema} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}