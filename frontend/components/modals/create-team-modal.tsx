"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { createTeamSchema } from "@/models/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUser } from "@/context/authContext"
import { z } from "zod"
import { Form } from "../ui/form"
import CustomInput from "../customInput"
import { useToast } from "@/hooks/use-toast"
import { createTeam } from "@/lib/actions/team-actions"


interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateTeamModal({ isOpen, onClose }: CreateTeamModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

    const { user } = useUser()
  
    const form = useForm<z.infer<typeof createTeamSchema>>({
      resolver: zodResolver(createTeamSchema),
      defaultValues: {
        name: "",
        description: "",
      },
    })

  const onHandleSubmit = async(values: z.infer<typeof createTeamSchema>) => {
    setIsLoading(true)
    if (user) {
      const { userId } = user
      values.userId = userId
    }
    try{
      let result = await createTeam(values)
      if (result.success) {
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
      <DialogContent className="sm:max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onHandleSubmit)}>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Equipo</DialogTitle>
              <DialogDescription>Completa la información para crear un nuevo equipo.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <CustomInput control={form.control} label='Nombre del equipo' name='name' type='text' placeholder='Ej: Equipo de desarrollo' />
              </div>
              <div className="grid gap-2">
                <CustomInput control={form.control} label='Descripción' name='description' type='textarea' placeholder='Describe el proposito del equipo' />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit"> {isLoading ? "Creando..." : "Crear Equipo"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
