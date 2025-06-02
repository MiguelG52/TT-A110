import { Save } from 'lucide-react'
import React from 'react'
import { SaveButton } from './saveButton'

interface ButtonBarProps {
    onSave?: () => void
}

const ButtonBar = ({onSave}:ButtonBarProps) => {
  return (
    <div>
        <SaveButton onSave={onSave} />
        
    </div>
  )
}

export default ButtonBar