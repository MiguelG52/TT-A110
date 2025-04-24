import { Card, CardContent, CardFooter } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


export const TeamSkeleton = ({ count = 1 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="p-6">
          <CardContent className="p-0 mb-4">
            <div className='flex justify-between items-center mb-6'>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="h-4 w-full mb-6" />
            <Skeleton className="h-4 w-2/3 mb-6" />

            <div className="flex -space-x-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-10 h-10 rounded-full" />
              ))}
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}