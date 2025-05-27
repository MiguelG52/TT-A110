import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BackButton() {
  const pathname = usePathname()
  
  if (pathname === '/odemia/home') {
    return null
  }

  const isTemarioDetalle = pathname.startsWith('/odemia/temario/')

  const href = isTemarioDetalle ? '/odemia/temario' : '/odemia/home'
  const texto = isTemarioDetalle ? 'volver al temario' : 'volver al inicio'

  return (
    <Link
      className='flex items-center gap-2 text-sm mb-4 text-gray-800 hover:text-gray-400 dark:text-gray-100 dark:hover:text-gray-300 capitalize'
      href={href}
    >
      <ArrowLeft size="1rem" />
      {texto}
    </Link>
  )
}
