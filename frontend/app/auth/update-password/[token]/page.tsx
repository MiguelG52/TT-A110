'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema } from '@/models/schemas';
import { methods } from '@/lib/endpoints';
import { useAlert } from '@/hooks/useAlert';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomInput from '@/components/customInput';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Header from '@/components/header';
import { WebService } from '@/lib/generalWebService';
import { AlertDialogService } from '@/lib/alert/alert.service';

type UpdatePasswordPage ={
  params:{
    token:string
  }
}
const UpdatePasswordPage = ({params}:UpdatePasswordPage) => {
  const [isLoading, setIsLoading] = useState(false);
  const {showAlert, hideAlert, alert} = useAlert();

    const form = useForm<z.infer<typeof updatePasswordSchema>>({
      resolver: zodResolver(updatePasswordSchema),
      defaultValues:{
        password:"",
        confirmPassword:"",
      }
    })
    async function onSubmit(values:z.infer<typeof updatePasswordSchema>){
      const newValues = {...values,token:""}
      setIsLoading(true);
      hideAlert()
      newValues.token = params.token
      try{
          const result = await WebService.postAsync(methods.auth.resetPassword, newValues)
          if (result.success) {
              showAlert(result.message,"success")
          } else {
              showAlert(result.message,"error")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <section className='bg-white w-full h-full md:w-1/2 lg:w-1/3 p-5 flex flex-col justify-center rounded-lg shadow-md'>
        <Header description="Actualiza tu contraseña"></Header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-start">
           
            <CustomInput control={form.control} label='Nueva Contraseña' name='password' type='text' placeholder='Contraseña' />
            <CustomInput control={form.control} label='Confirma Contraseña' name='confirmPassword' type='text' placeholder='Confirmar contraseña' />

            <div className='flex flex-col gap-2`'>
              <AlertDialogService show={alert.show} 
                text={alert.text} type={alert.type}
              />
                <Button disabled={isLoading} className='bg-blue-500 hover:bg-blue-400 w-full text-white mt-2' type="submit">
                  {isLoading ? <Loader2 size={20} className='animate-spin' /> : "Enviar"}
                </Button>
            </div>
            
          </form>
        </Form>
    </section>
  )
}

export default UpdatePasswordPage