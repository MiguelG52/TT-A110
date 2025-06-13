"use client"
import EditorHeader from '@/components/editor/editorHeader';
import MonacoEditor from '@/components/editor/editor';
import { useParams, useSearchParams } from 'next/navigation';
import { useCodeEditorSocket } from '@/hooks/useWebSockt';
import { useEffect, useRef, useState } from 'react';
import { CodeFile, Recommendation} from '@/models/types';
import { postAsync, postAsyncAuth, putAsyncAuth } from '@/lib/generalWebService';
import { methods } from '@/lib/endpoints';
import { ChevronLeft, ChevronRight, File, FolderTree, Hourglass, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import RecommendationsPanel from '@/components/editor/recomendationsPannel';
import { useUser } from '@/context/authContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  
  
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

  const handleFileSelect = (fileName: string) => {
    const file = codeFiles.find(f => f.fileName === fileName);
    if (file) {
      setSelectedFile(fileName);
      handleCodeChange(file.code);
    }
  };

  

  const handleClearEditor = () => {
    handleCodeChange('');
  };

  const handleImportFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        handleCodeChange(content);
      };
      reader.readAsText(file);
    }
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.java`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("javaCode");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCodeFiles(parsed);
        }
      } catch (err) {
        console.error("Error al parsear archivos:", err);
      }
    }
  }, []);

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
        handleClearEditor={handleClearEditor}
        handleImportFile={handleImportFile}
        handleDownload={handleDownload}
      />
      <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".java,.txt"
      />
      <div className="flex flex-row gap-4 mt-4">
        <div className={`transition-all duration-300 ${sidebarVisible ? "lg:w-1/6 q" : "lg:w-auto"}`}>
            <div className="mb-4 relative border-r border-r-gray-400">
              {sidebarVisible && (
                <>
                  <div className='ml-5'>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FolderTree className="h-4 w-5 mr-2 text-blue-400" />
                      </div>
                    </div>
                  </div>
                  <ul className="mt-2 ml-6 space-y-2">
                    {codeFiles.map((file, idx) => (
                      <li
                        key={idx}
                        className="flex  items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onClick={() => handleFileSelect(file.fileName)}
                      >
                        <File className="h-4 w-4 text-red-400" />
                        
                        <p className='truncate'>{file.fileName}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden">
              <MonacoEditor 
                code={code} 
                onChange={handleCodeChange} 
                theme="light" 
                language="java" 
              />
              {showRecommendationsPanel && (
              <div className={`w-60 lg:96 flex flex-col transition-all ease-linear duration-300 border-l p-5 border-gray-200 overflow-y-auto bg-gray-50`}>
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
      </div>

      
    </>
  );
};

export default EditorPage;