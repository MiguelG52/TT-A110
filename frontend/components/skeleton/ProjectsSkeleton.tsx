import { Card, CardContent, CardFooter } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export const ProjectSkeleton = ({ count = 1 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="p-6">
          <CardContent className="p-0 space-y-4">
            {/* Título del proyecto */}
            <Skeleton className="h-7 w-3/5" />
            
            {/* Descripción (2 líneas) */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            
            {/* Etiqueta de equipo */}
            <div className="flex items-center gap-2 pt-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </CardContent>
          
          <CardFooter className="p-0 pt-4">
            {/* Botón "Ver Detalles" */}
            <Skeleton className="h-10 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}