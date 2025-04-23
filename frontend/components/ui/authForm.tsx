'use client';
import React, { useState } from 'react'
import { authFormSchema } from '@/models/schemas'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import { authForm } from '@/models/types'
import { useForm } from 'react-hook-form'
import { set, z } from 'zod'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from '../customInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AlertDialogService } from '@/lib/alert/alert.service'
import { onSignIn } from '@/lib/auth/signIn.service'
import { onSignUp } from '@/lib/auth/signUp.service'

const AuthForm = ({ type }: authForm) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogPropierties, setDialogpropierties] = useState({show:false, text:"", type:""})
  const selectOptions = [
    { value: "3", label: "Alumno" },
    { value: "2", label: "Profesor" },
  ]
  
  const router = useRouter();

  const formSchema = authFormSchema(type);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setDialogpropierties({ ...dialogPropierties, show: false })
    try {
      let result;

      if (type === 'sign-in') {
        result = await onSignIn(values);
      } else {
        result = await onSignUp(values);
      }

      if (result.success) {
        if (type != 'sign-in') setDialogpropierties({show:true,text:result.message,type:"success"})
        else{
          let token:string = result.token
          if (token) {
            await fetch('/api/set-token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: token })
            });
            router.push('/odemia/home')
          }
        }
      } else {
        setDialogpropierties({show:true,text:result.message,type:"error"})
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='bg-white w-full h-full md:w-1/2 lg:w-1/3 p-5 flex flex-col justify-center rounded-lg shadow-md'>
      <header className='flex flex-col gap-5 md:gap-8 mb-6' >
        <Link href="/" className='cursor-pointer flex items-center justify-center'>
          <h1 className='capitalize text-lg font-bold '>Odemia</h1>
        </Link>

        <div>
          <h2 className='text-xl font-md lg:text-3xl text-gray-900'>
            {type === 'sign-in' ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>
          <p className='text-sm font-normal text-gray-600'>
            {type === 'sign-in' ? "Por favor, ingresa tus datos" : "Registrate para unirte a un equipo"}
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-start">
          {type === "sign-up" && (
            <>
              <CustomInput control={form.control} label='Nombre' name='name' type='text' placeholder='Miguel' />
              <CustomInput control={form.control} label='Apellidos' name='lastName' type='text' placeholder='Lechuga Salazar' />
              <CustomInput control={form.control} label='Nombre de usuario' name='username' type='text' placeholder='Mike' />
              <CustomInput control={form.control} options={selectOptions} label='Selecciona tu rol' name='roleId' type='select' placeholder='Profesor/Alumno' />
            </>
          )}

          <CustomInput control={form.control} label='Email' name='email' type='email' placeholder='Ingresa tu email' />
          <CustomInput control={form.control} label='Contraseña' name='password' type='password' placeholder='Ingresa tu contraseña' />

          {type === 'sign-in' && (
            <Link className='text-sm' href="/auth/reset-password">¿Olvidaste tu contraseña?</Link>
          )}

          <div className='flex flex-col gap-2`'>
            <AlertDialogService show={dialogPropierties.show} 
              text={dialogPropierties.text} type={dialogPropierties.type}
            />
            <Button disabled={isLoading} className='bg-blue-500 hover:bg-blue-400 w-full text-white mt-2' type="submit">
              {isLoading ? <Loader2 size={20} className='animate-spin' /> : (type === 'sign-in' ? "Iniciar Sesión" : "Crear Cuenta")}
            </Button>
          </div>
        </form>
      </Form>
      
      <footer className='flex justify-center gap-2 p-2'>
        <p className='text-sm text-gray-600'>
          {type === 'sign-in' ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
        </p>
        <Link className='text-sm text-blue-500 font-semibold' href={type === 'sign-in' ? "/auth/sign-up" : '/auth/sign-in'}>
          {type === 'sign-in' ? 'Crea una cuenta' : "Inicia Sesión"}
        </Link>
      </footer>
    </section>
  )
}

export default AuthForm;