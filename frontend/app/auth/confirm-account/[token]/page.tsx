import Link from 'next/link'
import React from 'react'



const ConfirmAccount = () => {
  return (
    <section className='bg-white w-full h-full md:w-1/2 lg:w-1/3 p-5 flex flex-col justify-center rounded-lg shadow-md'>
      <header className='flex flex-col gap-5 md:gap-8 mb-6' >
        <Link href="/" className='cursor-pointer flex items-center justify-center'>
          <h1 className='capitalize text-lg font-bold '>Odemia</h1>
        </Link>
        <div>
          <Link className='btn-primary' href={"/auth/sign-in"}>
            Iniciar Sesión
          </Link>
        </div>
      </header>
    </section>
  )
}

export default ConfirmAccount