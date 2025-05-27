
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

interface ConnectionStatusBadgeProps {
  isConnected: boolean
}

export const ConnectionStatusBadge = ({ isConnected }: ConnectionStatusBadgeProps) => {
  return isConnected ? (
    <Badge
      variant="outline"
      className="bg-green-50 text-green-600 border-green-200 flex items-center gap-1.5 px-2 py-1"
    >
      <Wifi className="h-3 w-3" />
      Conectado
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="bg-red-50 text-red-600 border-red-200 flex items-center gap-1.5 px-2 py-1"
    >
      <WifiOff className="h-3 w-3" />
      Desconectado
    </Badge>
  )
}