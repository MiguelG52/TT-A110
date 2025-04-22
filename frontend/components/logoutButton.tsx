'use client';
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/actions/logout.action';
import { LogOut } from 'lucide-react'

export default function BackButton() {
  

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={async () => {
        await logout()
      }}
    >
      <LogOut className="" />
    </Button>
  )
}
