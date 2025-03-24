
import AuthForm from '@/components/ui/authForm'
import React from 'react'

const SignUp = () => {

  return (
    <section className='p-5 flex  flex-col items-center md:justify-center max-sm:px-6'>
      <AuthForm type='sign-in' />
    </section>
  )
}

export default SignUp