
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TEMAS, Tema } from "@/lib/temario"
import Link from "next/link"

interface TemaCardProps {
  tema: Tema
}

export function TemaCard({ tema }: TemaCardProps) {
  const getBadgeColor = (categoria: string) => {
    switch (categoria) {
      case "basico":
        return "bg-green-100 text-green-800 hover:bg-green-300/70"
      case "intermedio":
        return "bg-blue-100 text-blue-800 hover:bg-blue-300/70"
      case "avanzado":
        return "bg-purple-100 text-purple-800 hover:bg-purple-300/70"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={`${getBadgeColor(tema.category)} capitalize`}>{tema.category}</Badge>
        </div>
        <CardTitle className="mt-4 flex items-center gap-2">
           
            <p className="text-center">{tema.title}</p>
        </CardTitle>
        
        <CardDescription>{tema.description}</CardDescription>
      </CardHeader>
      <CardContent>


        
            <Link href={`/odemia/temario/${tema.id}`} className="h-4 w-4" >
               <Button
                variant={"secondary"}
                className="w-full flex items-center justify-center gap-2 shadow-lg"
                >
                Ver Tema
                </Button>
            </Link>
        
      </CardContent>
    </Card>
  )
}