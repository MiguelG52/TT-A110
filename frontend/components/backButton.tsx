'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname == '/odemia/home')

  if (pathname == '/odemia/home') return <></>
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="mr-4"
    >
      <ArrowLeft className="" />
    </Button>
  )
}
