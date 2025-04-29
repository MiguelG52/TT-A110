import { Card, CardContent, CardFooter } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

 const StadisticSkeleton = ({ count = 1 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="p-6">
          <CardContent className="p-0 space-y-4">
            
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/5" />
            </div>
            <div className="p-0">
                <Skeleton className="h-14 w-1/4 rounded-md" />
            </div>

            <div className="p-0">
                <Skeleton className="pt-5 h-6 w-1/5" />
            </div>
          </CardContent>
          
        </Card>
      ))}
    </>
  )}
export default StadisticSkeleton
