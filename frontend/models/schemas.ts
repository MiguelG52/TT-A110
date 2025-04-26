import {z} from 'zod'

export const authFormSchema = (type:string) => z.object({
    name: type==="sign-in" ? z.string().optional(): z.string().min(3,{message:'El nombre es requerido'}),
    lastName:type==="sign-in" ? z.string().optional(): z.string().min(3,{message:'Los apellidos son requeridos'}),
    username:type==="sign-in" ? z.string().optional(): z.string().min(3,{message:'El nombre de usuario es requerido'}),
    roleId:type==="sign-in" ? z.string().optional(): z.string().min(1,{message: 'El rol es requerido'}),

    email: z.string().email({ message: 'El correo electrónico no es válido' }),
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
})

export const resetPasswordSchema = z.object({
    email: z.string().email({ message: 'El correo electrónico no es válido' })
})

export const updatePasswordSchema = z.object({
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], 
  });

export const createTeamSchema = z.object({
  userId: z.number().optional(),
  name: z.string().min(3, { message: 'El nombre del proyecto es requerido' }),
  description: z.string().min(3, { message: 'La descripción es requerida' }),
})


export const verifyAccountSchema = z.object({
  token:z.string().min(6).max(6)
})