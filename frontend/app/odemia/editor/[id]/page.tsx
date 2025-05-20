"use client"
import { useState } from 'react';
import EditorHeader from '@/components/editor/editorHeader';
import MonacoEditor from '@/components/editor/editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useSearchParams } from 'next/navigation';
import { useCodeEditorSocket } from '@/hooks/useWebSockt';



const EditorPage = ()=>{

    const [showRecommendations, setShowRecommendations] = useState(false)
    const searchParams = useSearchParams()
    const {id} = useParams()
    const isTemporary = searchParams.get('temp')
    const editorId = Array.isArray(id) ? id[0] : id;
    const { code, isConnected, handleCodeChange, connectedUsers } = useCodeEditorSocket(editorId);
   
    return (
    <> 
      <EditorHeader connectedUsers={connectedUsers} isConnected={isConnected} isTemporary={isTemporary==="true"?true:false} />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 min-w-0">
          <MonacoEditor 
            code={code} 
            onChange={handleCodeChange} 
            theme="light" 
            language="java" 
          />
        </div>

        <div className="w-85 border-l border-gray-200 overflow-y-auto bg-gray-50">
          <Tabs defaultValue="comments" className="h-full">
            <TabsList className="w-full bg-white">
              <TabsTrigger value="recommendations" className="flex-1 data-[state=active]:bg-gray-100">
                Recommendations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="recommendations" className="p-0 h-[calc(100%-40px)]">
              
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
    )
}

export default EditorPage
