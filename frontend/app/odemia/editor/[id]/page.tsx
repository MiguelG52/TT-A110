"use client"
import EditorHeader from '@/components/editor/editorHeader';
import MonacoEditor from '@/components/editor/editor';
import { useParams, useSearchParams } from 'next/navigation';
import { useCodeEditorSocket } from '@/hooks/useWebSockt';
import { useState } from 'react';
import { Recommendation } from '@/models/types';
import { postAsync } from '@/lib/generalWebService';
import { methods } from '@/lib/endpoints';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import RecommendationsPanel from '@/components/editor/recomendationsPannel';



const EditorPage = ()=>{

    const searchParams = useSearchParams()
    const {id} = useParams()
    const isTemporary = searchParams.get('temp')
    const editorId = Array.isArray(id) ? id[0] : id;
    const { code, isConnected, handleCodeChange, connectedUsers } = useCodeEditorSocket(editorId);
    const [recommendations, setRecommendations] = useState<Recommendation>({} as Recommendation)
    const [showRecommmentationsPanel, setRecommendationsPanel] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)

    const onHandleRecomendations = async() => {
      try {
        setLoading(true)
        const result = await postAsync(methods.projects.getRecomendations,{javaCode:code})
        if(result.success){
          await setRecommendations(result.data)
          toast({
          title: "Recomendaciones generadas",
          description: `Se encontraron ${Object.keys.length} recomendaciones para tu código.`,
          variant:"default"
          })
        
        }else{
          toast({
            title: "Error",
            description: "No se pudieron obtener los resultados",
            variant: 'destructive'})
        }
        
      } catch (error) {
        
      }finally{
        setLoading(false)
      }
      
    }

   
    return (
    <> 
      <EditorHeader 
      handleRecommmentations={onHandleRecomendations} 
      isLoading={loading} 
      connectedUsers={connectedUsers} 
      isConnected={isConnected} 
      isTemporary={isTemporary==="true"?true:false}
      showRecomendationsPanel={showRecommmentationsPanel}
      recomendations={recommendations}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 min-w-0">
          <MonacoEditor 
            code={code} 
            onChange={handleCodeChange} 
            theme="light" 
            language="java" 
          />
        </div>

        <div className={`md:w-35 min-w-35 transition-all ease-linear duration-300 border-l p-5 border-gray-200 overflow-y-auto bg-gray-50`}>
          {
            loading ? (
            <>
              <Loader2 size={20} className='animate-spin' />
            </>):(
              <RecommendationsPanel recomendations={recommendations}/>
            )
          }
        </div>
      </div>
    </>
    )
}

export default EditorPage
