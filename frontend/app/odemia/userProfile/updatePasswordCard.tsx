import CustomInput from '@/components/customInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useUser } from '@/context/authContext'
import { toast } from '@/hooks/use-toast'
import { methods } from '@/lib/endpoints'
import { putAsyncAuth } from '@/lib/generalWebService'
import { updateActualPassword } from '@/models/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const UpdatePasswordCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {user} = useUser()
  const form = useForm<z.infer<typeof updateActualPassword>>({
    resolver: zodResolver(updateActualPassword),
    defaultValues: {
      actualPassword:"",
      newPassword:"",
      confirmPassword:"",
    }
  })

  const onSubmit = async (values: z.infer<typeof updateActualPassword>) => {
    setIsLoading(true)
    try{
      const result = await putAsyncAuth(`${methods.auth.updatePassword}/${user?.userId}`, values)
      if (result.success) {
        toast({
          title: "Exito",
          description: result.message,
          variant: 'default'}
        )
        form.reset()
      } else {
          toast({
            title: "Error",
            description: result.message,
            variant: 'destructive'})
      }
      } catch (error) {
          console.log(error)
          toast({
            title: "Error",
            description: "Error al actualizar la información",
            variant: 'default'})
      } finally {
      setIsLoading(false);
      }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cambiar contraseña</CardTitle>
        <CardDescription>Actualiza tu contraseña</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <CustomInput control={form.control} name="actualPassword" label='Contraseña Actual' placeholder='' type='text' />
              </div>
              <div className="grid gap-2">
                <CustomInput control={form.control} name="newPassword" label='Nueva contraseña' placeholder='' type='text' />
              </div>
              <div className="grid gap-2">
                <CustomInput control={form.control} name="confirmPassword" label='Confirmar Contraseña' placeholder='' type='text' />
              </div>
              <div className="grid gap-2">
                  <Button disabled={isLoading} variant="default" type="submit">
                      {isLoading ? <Loader2 size={20} className='animate-spin' /> : "Actualizar información"}
                  </Button> 
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>  
  )
}

export default UpdatePasswordCard