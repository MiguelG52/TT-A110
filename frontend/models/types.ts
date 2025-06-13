import { Control, FieldPath  } from "react-hook-form"
import {z} from 'zod'
import { authFormSchema } from "./schemas"

export type authForm = {
    type:string
}

const formSchema = authFormSchema("sign-up")

export type customInput = {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    type: string,
    label:string
    placeholder: string
}

export type editor = {
    code:string,
    onChange:(value:string)=>void,
    theme?:string
}

  
export type RecommendationsPanelProps = {
    code: string
    isVisible: boolean
    onClose: () => void
    isConnected: boolean
  }

export interface IAlertService {
    show:boolean,
    text:string,
    type:string,
}  

export interface Option {
    value: string;
    label: string;
  }

export interface ICustomInput {
    control: any;
    name: any;
    label: string;
    placeholder?: string;
    type: 'text' | 'textarea' | 'select' | 'email' | 'password' | 'number';
    options?: Array<Option | IIteamTeam>; // Solo para select
    maxLength?:number;
  }

export interface IMember{
  user:{
    username:string
  },
  userId:number
}
export interface ITeam {
    teamId: string;
    name: string;
    description?: string;
    teamCodeId:string,
    members:IMember[],
}
export interface IIteamTeam{
  name:string,
  teamId:string,
}

export interface ITeamProject{
  name:string,
  teamId:number
}
export interface IProjectCard{
  description:string,
  name:string,
  projectId:number,
  teams: ITeamProject[]
}

export interface IStat{
  title:string
  diff:number,
  diffText:string,
  total:number
}
export interface ISummaryCard{
  projects:IStat
  teams:IStat
}
export interface ITeamMember{
  userId: number,
  name: string,
  lastName: string,
  email: string, 
  username: string
}
export interface IProject{
  projectId:number,
  name:string,
  description:string,
  originalCode?:string,
  improveCode?:string,
  team:{
    "teamId":string,
    "name":string,
    "description":string,
  }
  members:ITeamMember[]
  codeFiles:CodeFile[]
}

export interface ICode{
  javaCode:string
}
export interface Recommendation {
  type: 'improvement' | 'bestPractice' | 'optimization' | 'error' | 'security';
  title: string;
  description: string;
  code?: string;
  line: number;
  severity?: 'low' | 'medium' | 'high';
  confidence?: number;
}

export interface RecommendationsResponse {
  recommendations: Recommendation[];
  analysisSummary: string;
  overallScore?: number;
}

export interface saveChanges {
  improvedCode: string,
  userId:number
}

export type Recomendacion = {
  id: string;
  type: string;
  title: string;
  description: string;
  code: string;
  line: number;
  severity: string;
};

export type CodeFile = {
  code: string;
  recomendations: Recomendacion[];
  fileName: string;
};