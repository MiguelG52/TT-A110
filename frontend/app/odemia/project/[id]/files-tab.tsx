import { CodeFile } from '@/models/types'
import React from 'react'

interface filesTab {
  codeFiles?: CodeFile[]
}

const FilesTab = ({codeFiles}:filesTab) => {
  return (
    <div>FilesTab</div>
  )
}

export default FilesTab