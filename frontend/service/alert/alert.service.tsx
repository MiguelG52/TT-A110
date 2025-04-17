'use client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { IAlertService } from "@/models/types"
import { AlertCircle } from "lucide-react"
  
  export function AlertDialogService({show,text, type}:IAlertService) {
    const variant:any = type;
    return (
      <>
        {show?
          <Alert className="m-1" variant={variant}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="capitalize">{type === "success" ? "éxito": type=="error"?"error":"info"}</AlertTitle>
            <AlertDescription>
              {text}
            </AlertDescription>
          </Alert>:
        null
      }
      </>
    )
  }