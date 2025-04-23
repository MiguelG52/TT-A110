"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface JoinTeamModalProps {
  isOpen: boolean
  onClose: () => void
}

export function JoinTeamModal({ isOpen, onClose }: JoinTeamModalProps) {
  const [teamId, setTeamId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para unirse al equipo
    console.log("Unirse al equipo con ID:", teamId)
    onClose()
    setTeamId("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Unirse a un Equipo</DialogTitle>
            <DialogDescription>Ingresa el ID del equipo al que deseas unirte.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="team-id">ID del Equipo</Label>
              <Input
                id="team-id"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="Ej: TEAM-123"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button  className="btn-primary" type="submit">Unirse</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
