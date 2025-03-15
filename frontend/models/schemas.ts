import {z} from 'zod'

export const authFormSchema = (type:string) => z.object({
    name: type==="sign-in" ? z.string().optional(): z.string().min(3,{message:'El nombre es requerido'}),
    lastName:type==="sign-in" ? z.string().optional(): z.string().min(3,{message:'Los apellidos son requeridos'}),
    username:type==="sign-in" ? z.string().optional(): z.string().min(3,{message:'El nombre de usuario es requerido'}),
    role:type==="sign-in" ? z.string().optional(): z.string().min(1,{message: 'El rol es requerido'}),

    email: z.string().email({ message: 'El correo electrónico no es válido' }),
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
})

