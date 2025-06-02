import { IUser } from '@/models/models';
import { Recommendation } from '@/models/types';
import { ConnectionStatusBadge } from './buttons/connectionStatusBadge';
import { RecommendationsButton } from './buttons/RecomendationButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useParams, usePathname } from 'next/navigation';
import { useUser } from '@/context/authContext';
import { BrushIcon, DownloadCloudIcon, Eraser, Import, Save } from 'lucide-react';
import ActionBarButton from './buttons/ActionBarButton';

type EditorHeaderProps = {
  isConnected: boolean;
  isTemporary?: boolean;
  connectedUsers: IUser[];
  isLoading: boolean;
  handleRecommendations: () => void;
  handleSaveChanges: () => void;
  recommendations: Recommendation[];
  showRecommendationsPanel?: boolean;
  code?: string;
  handleClearEditor:() => void;
  handleImportFile:() => void;
  handleDownload:() => void;
};


const EditorHeader = ({
  showRecommendationsPanel,
  isConnected, 
  handleRecommendations, 
  isLoading, 
  recommendations,  
  isTemporary,
  connectedUsers,
  handleSaveChanges,
  handleClearEditor,
  handleImportFile,
  handleDownload,

}: EditorHeaderProps) => {

  return (
    <header className="flex items-center justify-between my-4">
      <div className='flex items-center justify-around gap-2'>
        {
          isTemporary ? <></>:(<ActionBarButton icon={<Save className="h-4 w-4" />} text='/Guardar Cambios' onHandleButton={handleSaveChanges}/>)
        }
        <ActionBarButton icon={<Import className="h-4 w-4" />} text='Importar Archivo' onHandleButton={handleImportFile}/>
        <ActionBarButton icon={<DownloadCloudIcon className="h-4 w-4" />} text='Descargar' onHandleButton={handleDownload}/>
        <ActionBarButton icon={<Eraser className="h-4 w-4" />} text='Limpiar' onHandleButton={handleClearEditor}/>
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <ConnectionStatusBadge isConnected={isConnected} />
        
         {!isTemporary && isConnected && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="">
                  <div className="">
                    {connectedUsers.slice(0, 3).map((user, i) => (
                        <Avatar key={user.userId} className="h-6 b w-6 border border-white">
                          <AvatarFallback className="text-xs bg-gray-200">{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                    </div>
                    {connectedUsers.length > 3 && (
                        <Badge variant="outline" className="ml-1 bg-gray-100 text-xs">
                        +{connectedUsers.length - 3}
                        </Badge>
                    )}
                  </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Usuarios Conectados: {connectedUsers.map((u) => u.name).join(", ")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
          
        <RecommendationsButton 
          onClick={handleRecommendations}
          isLoading={isLoading}
          hasRecommendations={recommendations.length > 0}
          recommendationsCount={recommendations.length}
        />
      </div>
    </header>
  );
};

export default EditorHeader;