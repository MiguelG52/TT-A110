"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { joinToTeamSchema } from "@/models/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "../ui/form"
import CustomInput from "../customInput"
import { joinToTeam } from "@/lib/actions/team-actions"
import { useUser } from "@/context/authContext"

interface JoinTeamModalProps {
  isOpen: boolean
  onClose: () => void
}

export function JoinTeamModal({ isOpen, onClose }: JoinTeamModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  const { user } = useUser()
    

  const form = useForm<z.infer<typeof joinToTeamSchema>>({
    resolver:zodResolver(joinToTeamSchema),
    defaultValues:{
      teamCodeId:""
    }
  })

  const onHandleSubmit = async(values:z.infer<typeof joinToTeamSchema>) => {
    setIsLoading(true)
    values.userId = user?.userId
    try{
      let result = await joinToTeam(values)
      if(result.success){
        toast({
          title: "Exito",
          description: result.message,
          variant: 'default'})
      }else{
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive"})
      }
      form.reset()
      onClose()
    }catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    } 
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onHandleSubmit)}>
            <DialogHeader>
              <DialogTitle>Unirse a un Equipo</DialogTitle>
              <DialogDescription>Ingresa el ID del equipo al que deseas unirte.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <CustomInput maxLength={8} control={form.control} label="Código del equipo" name="teamCodeId" type="text" placeholder="Código del equipo de 8 digitos "/>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button  className="btn-primary" type="submit">{isLoading ? "Unindose..." : "Unirse"} </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
