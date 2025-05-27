'use client'
import { toast } from '@/hooks/use-toast'
import { methods } from '@/lib/endpoints'
import { postAsync } from '@/lib/generalWebService'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation' 
import React, { useEffect, useState } from 'react'
import { set } from 'zod'

const ConfirmAccount = () => {
  const token = useParams().token || useSearchParams().get('token')
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  // Verifica si el token es válido

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        if (token) {
          setLoading(true)
          const result = await postAsync(methods.auth.confirmAccount, { token: token })
          if (result.success) {
            toast({
              title: "Exito",
              description: `${result.message}`,
              variant: "default"
            })
            router.push('/auth/sign-in')
          } else {
            toast({
              title: "Error",
              description: `${result.message}`,
              variant: "destructive"
            })
            setError(result.message || "Error al confirmar la cuenta")
          }
        } else {
          throw new Error("No se proporcionó un token de confirmación")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Ocurrió un error al confirmar la cuenta",
          variant: "destructive"
        })
        setError(error instanceof Error ? error.message : "Error al confirmar la cuenta")
      }finally {
        setLoading(false)
      }
    }

    confirmAccount()
  }, [token, router]) // Añadí token y router como dependencias

  return (
    <section className='bg-white w-full h-full md:w-1/2 lg:w-1/3 p-5 flex flex-col justify-center rounded-lg shadow-md'>
      <header className='flex flex-col gap-5 md:gap-8 mb-6'>
        <h1 className='text-2xl font-bold text-center'>Confirmar Cuenta</h1>
        {loading ? (
          <p className='text-center'>Confirmando cuenta...</p>
        ) : error ? (
          <p className='text-red-500 text-center'>{error}</p>
        ) : (
          <p className='text-center'>Tu cuenta ha sido confirmada exitosamente. Puedes iniciar sesión ahora.</p>
        )}
      </header>
    </section>
  )
}

export default ConfirmAccount