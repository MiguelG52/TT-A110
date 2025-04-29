"use client"
import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,
} from "@/components/ui/dialog"
import { useUser } from "@/context/authContext"
import { z } from "zod"
import { Form } from "../ui/form"
import { useToast } from "@/hooks/use-toast"
import { createProjectSchema } from "@/models/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from "../customInput"
import { getAllTeamsByUserId } from "@/lib/actions/team-actions"
import { IIteamTeam } from "@/models/types"
import { createProject } from "@/lib/actions/projects-actions"

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const { user } = useUser()
    const [error, setError] = useState<string | null>(null)
    const [teams, setTeams] = useState<IIteamTeam[]>([])

    const form = useForm<z.infer<typeof createProjectSchema>>({
      resolver:zodResolver(createProjectSchema),
      defaultValues:{
        teamId:"",
        description:"",
        name:""
      }
    })

  const fetchAllTeams = useCallback(async()=>{
    try{
      if(user?.userId !== undefined) {
          setLoading(true)
          const result = await getAllTeamsByUserId(user.userId)
          if (!result.success) {
            throw new Error(result.message || "Error al cargar equipos")
          }      
          if(result.data.length == 0) setTeams([{teamId:"0",name:"No hay equipos registrados"}])
          else setTeams(result.data || [])
          
          setError(null)
      } 
      else {
        throw new Error("El id del usuario está indefinido")
      }
    } catch (err: any) {
        setError(err.message || "Error al cargar equipos")
        setTeams([])
    } finally {
      setLoading(false)
    }
  },[user?.userId])

  useEffect(()=>{
    fetchAllTeams()
  }, [isOpen])
  
  const onHandleSubmit = async(values: z.infer<typeof createProjectSchema>) => {
    setLoading(true);
    values.userId = user?.userId
    try{
      let result = await createProject(values)
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
      setLoading(false);
    } 
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onHandleSubmit)}>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
              <DialogDescription>Completa la información para crear un nuevo proyecto.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <CustomInput control={form.control} label="Nombre del Proyecto" name="name" type="text" placeholder="Ej: Práctica 2 - Encapsulación "/>
              </div>
              <div className="grid gap-2">
                <CustomInput control={form.control} label="Descripción" name="description" type="textarea" placeholder="Describe el proposito del proyecto "/>
              </div>
              <div className="grid gap-2">
              {
                teams.length && <CustomInput maxLength={8} options={teams} control={form.control} label="Equipo a cargo" placeholder="Equipo 2"  name="teamId" type="select"/>
              }
              </div>

            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Crear Proyecto</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
