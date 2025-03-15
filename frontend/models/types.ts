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
