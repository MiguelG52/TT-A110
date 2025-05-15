import { ArrowLeft} from 'lucide-react'
import Link from 'next/link'

export default function BackButton() {
  
  return (
    <Link
      className='flex items-center gap-2 text-sm mb-4 text-gray-800 hover:text-gray-400 dark:text-gray-100 dark:hover:text-gray-300 capitalize'
      href='/odemia/home'
    >
      <ArrowLeft size={"1rem"} className="" />
      volver al inicio
    </Link>
  )
}
