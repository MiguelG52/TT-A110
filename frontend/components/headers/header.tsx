import Link from 'next/link'
import React from 'react'

type header = {
    description:string
}
const Header = ({description}:header) => {
  return (
    <header className='flex flex-col gap-5 md:gap-8 mb-6' >
        <Link href="/" className='cursor-pointer flex items-center justify-center'>
              <h1 className='capitalize text-lg font-bold '>Odemia</h1>
        </Link>
        <p className='text-sm font-normal text-gray-600'>
            {description}
        </p>
      
    </header>
  )
}

export default Header