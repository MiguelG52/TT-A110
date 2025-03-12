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


const AuthForm = ({type}:authForm) => {

  const [user, setUser] = useState(null)

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver:zodResolver(authFormSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })
  function onSubmit(values:z.infer<typeof authFormSchema>){

  }
  return (
    <section className='authForm'>
      <header className='flex flex-col gap-5 md:gap-8 mb-6' >
        <Link href="/" className='cursor-pointer flex items-center gap-1'>
          <h1 className='capitalize text-xl font-bold'>odemia</h1>
        </Link>

        <div>
          <h1 className='text-xl font-semibold lg:text-3xl text-gray-900'>
            {user ? "link account": type === 'sign-in' ? "Iniciar Sesión": "Crear Cuenta" }
          </h1>
          <p className='text-sm font-normal text-gray-600'>
            {
              user ? "Crea tu cuenta para unirte a un equipo":"Por favor, ingresa tus datos"
            }

          </p>
        </div>
      </header>
      {user?(
        <div className='flex flex-col gap-4'>

        </div>
      ):(
        <>
           <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start">
              <CustomInput control={form.control} label='Email' name='email' type='email' placeholder='Ingresa tu email' />     
              <CustomInput control={form.control} label='Contraseña' name='password' type='password' placeholder='Ingresa tu contraseña' />        
              {type==='sign-in'?(<>
                <Link className='text-sm mt-3' href="/auth/create-account">¿Olvidaste tu contraseña?</Link>
              </>):null
                
              }
              <Button className='bg-blue-600 w-full text-white mt-9'  type="submit">Iniciar Sesión</Button> 
            </form>
          </Form>
          <footer className='flex justify-center gap-2 p-2'>
            <p className='text-sm text-gray-600'>
              {type === 'sign-in' ? "¿No tienes una cuenta?": "¿Ya tienes una cuenta? "}
            </p>
            <Link className='text-sm' href={type === 'sign-in'? "/auth/sign-up" : '/auth/sign-in'}>
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