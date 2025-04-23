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

export type Recommendation = {
    id: string
    title: string
    description: string
    code?: string
    type: "improvement" | "optimization" | "security" | "style"
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
    options?: Option[]; // Solo para select
  }