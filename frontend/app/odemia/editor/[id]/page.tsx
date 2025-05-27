"use client"
import EditorHeader from '@/components/editor/editorHeader';
import MonacoEditor from '@/components/editor/editor';
import { useParams, useSearchParams } from 'next/navigation';
import { useCodeEditorSocket } from '@/hooks/useWebSockt';
import { useState } from 'react';
import { Recommendation} from '@/models/types';
import { postAsync, postAsyncAuth, putAsyncAuth } from '@/lib/generalWebService';
import { methods } from '@/lib/endpoints';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import RecommendationsPanel from '@/components/editor/recomendationsPannel';
import { useUser } from '@/context/authContext';

const EditorPage = () => {
  const searchParams = useSearchParams();
  const {id} = useParams();
  const isTemporary = searchParams.get('temp');
  const editorId = Array.isArray(id) ? id[0] : id;
  const { code, isConnected, handleCodeChange, connectedUsers } = useCodeEditorSocket(editorId, isTemporary === "true");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showRecommendationsPanel, setRecommendationsPanel] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [loadingChanges, setLoadingChanges] = useState(false);
  const {user} = useUser();

  const onHandleRecommendations = async () => {
    try {
      setLoading(true);
      const result = await postAsyncAuth(
        methods.recomendations.generate,
        { javaCode: JSON.stringify(code) }
      );
      
      if(result.success){
        setRecommendations(result.data.recommendations || []);
        setRecommendationsPanel(true);
        toast({
          title: "Recomendaciones generadas",
          description: `Se encontraron ${result.data.recommendations?.length || 0} recomendaciones.`,
          variant: "default"
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudieron obtener recomendaciones",
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al generar recomendaciones",
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const onSaveChanges = async () => {
    try {
      setLoadingChanges(true);
      const result = await putAsyncAuth(
        `${methods.projects.saveChanges}/${id}`,
        { userId:user?.userId, improveCode: JSON.stringify(code) }
      );
      
      if(result.success){
        toast({
          title: "Cambios guardados",
          description: "El código se ha guardado correctamente.",
          variant: "default"
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "No se pudieron guardar los cambios",
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar los cambios",
        variant: 'destructive'
      });
    } finally {
      setLoadingChanges(false);
    }
  }
  return (
    <> 
      <EditorHeader 
        handleRecommendations={onHandleRecommendations} 
        isLoading={loading} 
        connectedUsers={connectedUsers} 
        isConnected={isConnected} 
        isTemporary={isTemporary === "true"}
        showRecommendationsPanel={showRecommendationsPanel}
        recommendations={recommendations}
        handleSaveChanges={onSaveChanges}
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

        {showRecommendationsPanel && (
          <div className={`md:w-96 min-w-96 transition-all ease-linear duration-300 border-l p-5 border-gray-200 overflow-y-auto bg-gray-50`}>
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 size={20} className='animate-spin' />
              </div>
            ) : (
              <RecommendationsPanel recommendations={recommendations} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EditorPage;