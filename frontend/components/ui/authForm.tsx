'use client'
import React, { useState } from 'react'
import { authFormSchema } from '@/models/schemas'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import { authForm } from '@/models/types'
import {useForm} from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from '../customInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authService} from '@/service/auth/signIn.service'



const AuthForm = ({type}:authForm) => {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })
  async function onSubmit(values:z.infer<typeof formSchema>){
    setIsLoading(true)
    let result;
    if (type === 'sign-in') {
      result = await authService(values)
    }else{
      result = authService(values)
    }


    /*
    if(type==='sign-in'){
      router.push("/")
    }
    if(type === "sign-up"){
      router.push("/auth/sign-in")
    }
    */
   setIsLoading(false);
  }
  return (
    <section className='bg-white w-full md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-md'>
      <header className='flex flex-col gap-5 md:gap-8 mb-6' >
        <Link href="/" className='cursor-pointer flex items-center gap-1'>
          <h1 className='capitalize text-xl font-bold'>odemia</h1>
        </Link>

        <div>
          <h1 className='text-xl font-semibold lg:text-3xl text-gray-900'>
            {user ? "link account": type === 'sign-in' ? "Iniciar Sesión": "Crear Cuenta" }
          </h1>
          <p className='text-sm font-normal text-gray-600'>
            {user ? "Crea tu cuenta para unirte a un equipo":"Por favor, ingresa tus datos"}
          </p>
        </div>
      </header>
      {user?(
        <div className='flex flex-col gap-4'>

        </div>
      ):(
        <>
           <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 justify-start">              
              {type==="sign-up" &&(
                <>
                  <div className='flex flex-col justify-between'>
                    <CustomInput control={form.control} label='Nombre' name='name' type='text' placeholder='Miguel'/>
                    <CustomInput control={form.control} label='Apellidos' name='lastName' type='text' placeholder='Lechuga Salazar'/>
                  </div>
                  <div className='flex flex-col justify-between'>
                    <CustomInput control={form.control} label='Nombre de usuario' name='username' type='text' placeholder='Mike'/>
                    <CustomInput control={form.control} label='Selecciona tu rol' name='role' type='select' placeholder='Profesor/Alumno'/>
                  </div>
                </>
              )}


              <CustomInput control={form.control} label='Email' name='email' type='email' placeholder='Ingresa tu email' />     
              <CustomInput control={form.control} label='Contraseña' name='password' type='password' placeholder='Ingresa tu contraseña' />        
              {type==='sign-in'?(<>
                <Link className='text-sm' href="/auth/reset-password">¿Olvidaste tu contraseña?</Link>
              </>):null
                
              }
              <div className='flex flex-col gap-4'>
                <Button disabled={isLoading} className='form-btn bg-blue-600 hover:bg-blue-400  w-full text-white mt-2'  type="submit">
                  {isLoading?
                    (
                      <>
                        <Loader2 size={20}  className='animate-spin'/>
                      </>
                    ):(
                      type === 'sign-in'?"Iniciar Sesión":"Crear Cuenta"
                    )  
                  }  
                </Button> 
              </div>
            </form>
          </Form>
          <footer className='flex justify-center gap-2 p-2'>
            <p className='text-sm text-gray-600'>
              {type === 'sign-in' ? "¿No tienes una cuenta?": "¿Ya tienes una cuenta? "}
            </p>
            <Link className='text-sm text-blue-600 font-semibold' href={type === 'sign-in'? "/auth/sign-up" : '/auth/sign-in'}>
                    {
                      type === 'sign-in' ? 'Crea una cuenta' : "Inicia Sesión"
                    }
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm