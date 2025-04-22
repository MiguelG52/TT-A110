import CustomInput from '@/components/customInput';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAlert } from '@/hooks/useAlert';
import { methods } from '@/lib/endpoints';
import { resetPasswordSchema } from '@/models/schemas';
import { AlertDialogService } from '@/lib/alert/alert.service';
import { WebService } from '@/lib/generalWebService';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {showAlert, hideAlert, alert} = useAlert()
  
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues:{
      email:""
    }
  })
  async function onSubmit(values:z.infer<typeof resetPasswordSchema>){
    setIsLoading(true);
    hideAlert()
    try{
        let result = await WebService.postAsync(methods.auth.forgotPassword, values)
          console.log(result);
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
        <Header description="Recupera tu contraseña"></Header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-start">
           
            <CustomInput control={form.control} label='Email' name='email' type='email' placeholder='Ingresa tu email' />
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

export default ResetPassword