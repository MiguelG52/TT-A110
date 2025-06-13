import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import InformationTab from './information-tab'
import FilesTab from './files-tab'
import { CodeFile, ITeamMember } from '@/models/types'

interface IProjectBodyProps {
  description?: string
  members?: ITeamMember[]
  codeFiles?: CodeFile[]
}

const ProjectBody = ({ description = '', members = [], codeFiles = [] }: IProjectBodyProps) => {
  return (
    <div>
      <Tabs defaultValue="informacion" className="mb-8">
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 mb-6">
          <TabsTrigger
            value="informacion"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-transparent px-4 py-2"
          >
            Información
          </TabsTrigger>
          <TabsTrigger
            value="archivos"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-transparent px-4 py-2"
          >
            Archivos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="informacion">
          <InformationTab description={description} members={members} />
        </TabsContent>
        
        <TabsContent value="archivos">
          <FilesTab codeFiles={codeFiles}  />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProjectBody