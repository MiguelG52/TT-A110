import CustomInput from '@/components/customInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useUser } from '@/context/authContext'
import { useToast } from '@/hooks/use-toast'
import { methods } from '@/lib/endpoints'
import { putAsyncAuth } from '@/lib/generalWebService'
import { updateUserSchema } from '@/models/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type updateUserComponent = {
  isLoading:boolean,
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateUserDataCard = ({isLoading, setIsLoading}:updateUserComponent) => {
  const { toast } = useToast()
  const {updateUser, user} = useUser()
  
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || "",
      userId: user?.userId || 0  
    }
  })

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    setIsLoading(true)
    try{
      const result = await putAsyncAuth(`${methods.user.updateUserData}?userId=${values.userId}`, values)
      if (result.success) {
            toast({
                title: "Exito",
                description: result.message,
                variant: 'default'}
            )
            updateUser({
              ...user, 
              ...values 
            })
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
        <CardTitle>Datos Personales</CardTitle>
          <CardDescription>Actualiza tu información personal.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-start">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <CustomInput control={form.control} name="name" label='Nombre' placeholder='Ej: Miguel' type='text' />
              </div>
              <div className="grid gap-2">
                <CustomInput control={form.control} name="lastName" label='Apellidos' placeholder='Ej: González' type='text' />
              </div>
              <div className="grid gap-2">
                <CustomInput control={form.control} name="username" label='Nombre de usuario' placeholder='Ej: User234' type='text' />
              </div>
              <div className="grid gap-2">
                <CustomInput control={form.control} name="email" label='Email' placeholder='Ej: user@email.com' type='email' />
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

export default UpdateUserDataCard