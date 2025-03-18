import { Control, FieldPath  } from "react-hook-form"
import {z} from 'zod'
import { authFormSchema } from "./schemas"

export type authForm = {
    type:string
}

export type customInput = {
    control: Control<z.infer<typeof authFormSchema>>,
    name: FieldPath<z.infer<typeof authFormSchema>>,
    type: string,
    label:string
    placeholder: string

}