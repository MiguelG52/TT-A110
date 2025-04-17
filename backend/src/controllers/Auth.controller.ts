import type { Request, Response } from 'express';
import  User  from '../models/user.model';
import { hashPassword, verifyPassword } from '../helpers/auth.helper';
import { generateToken } from '../helpers/token.helper';
import { EmailService } from '../services/Email.Service';
import { generateJWT, verfyJWT} from '../helpers/jwt.helper';
import { error } from 'console';

export class AuthController {
    static async createAccount(req: Request, res: Response) {    
        //validate if email is already registered
        const { email, password} = req.body;

        try {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                const error = new Error('El usuario ya existe');
                res.status(400).json({error:error.message});
                return
            }

            const user = new User(req.body);
            const passwordEncrypted = await hashPassword(password);
            const token = generateToken();
            user.dataValues.token = token;
            user.dataValues.password = passwordEncrypted;
            await user.save();
            
            const emailStatus = await EmailService.sendEmailConfirmacion({
                name:user.dataValues.name,
                email: user.dataValues.email,
                token: user.dataValues.token
            })
            if(emailStatus.error){
                res.status(500).json({error:"Ocurrio un error al enviar el correo"})
                return
            }
            res.status(200).json({message:"Cuenta creada correctamente, por favor revise su cuenta de correo para verificar su cuenta."});
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error:"Error al crear usuario",
            });
            return
        }
    }

    static async confirmAccount(req: Request, res: Response) {
        try {
            const { token } = req.body;

            const user = await User.findOne({ where: { token } });
            if (!user) {
               res.status(404).json({ error: "Token no válido" });
               return
            }
            await user.update({
                token: null,
                isVerified: true
            });
            res.status(201).json({ message: "Cuenta verificada correctamente" });
            return 
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Error al confirmar la cuenta" });
            return
        }
    }

    static async loginAccount(req: Request, res:Response){
        try{
            const { email, password } = req.body;
            const user = await User.findOne({where:{email}})
            if(!user){
                const error = new Error("El email ingresado no esta registrado.")
                res.status(404).json({error:error.message})
                return
            }      
            if(!user.dataValues.isVerified){
                const error = new Error("El email ingresado no esta verificado.")
                res.status(403).json({error:error.message})
                return
            }
            const isPasswordCorrect = await verifyPassword(password, user.dataValues.password)
            if(!isPasswordCorrect){
                const error = new Error("La contraseña ingresada no es correcta.")
                res.status(401).json({error:error.message})
                return
            }
            //generate jwt
            const jwt = await generateJWT(user.dataValues.userId)
            res.json({token:jwt}) 
        }catch(error){
            res.status(500).json({error:`"Error al iniciar sesión ${error}`})
            return
        }
    }

    static async verifyToken(req:Request, res:Response){
        const { token } = req.body
        
        const tokenExists = await User.findOne({where:{token}})
        if(!tokenExists){
            const error = new Error("Token no válido")
            res.status(404).json({error:error.message})
        }
        res.status(200).json({message:"Token válido"})
    }


    static async forgotPassword(req:Request, res:Response){
        const {email} = req.body;
        let newToken = ""
        const user = await User.findOne({where:{email}})
        if(!user){
            const error = new Error("El email ingresado no esta registrado")
            res.status(404).json({error:error.message})
            return
        }
        newToken = generateToken()
        await user.update({
            token: newToken
        })
        const emailStatus = await EmailService.sendResetPasswordEmail({
            email:user.dataValues.email,
            name: user.dataValues.name,
            token: user.dataValues.token
        })
        if(emailStatus.error) res.status(500).json({message:"Ocurrio un error al enviar el correo"})
        res.status(200).json({message:"Revisa tu email y sigue las instrucciones"})
    }

    static async resetPasswordWithToken(req:Request, res:Response){
        const {password, token} = req.body

        try {
            const user = await User.findOne({where:{token}})
            if(!user){
                const error = new Error("El token no es valido")
                res.status(404).json({error:error.message})
                return    
            }
            const passwordEncrypted = await hashPassword(password);
            await user.update({
                password: passwordEncrypted,
                token: null
            })
            res.status(200).json({message:"Contraseña actualizada correctamente"})
        }catch (error) {
            console.log(error)
            res.status(500).json({error:"Error al cambiar la contraseña"})
            return
        }
    }

    //Corregir la funcion
    static async updatePassword(req:Request, res:Response){
        const {currentPassword, newPassword} = req.body
        const {userId} = req.user
        
        try {
            const user = await User.findByPk(userId)
            if(!user){
                const error = new Error("El token no es valido")
                res.status(404).json({error:error.message})
                return    
            }
            const isActualPassword = await verifyPassword(currentPassword, user.dataValues.password);
    
            if(!isActualPassword){
                const error = new Error("La contraseña actual ingresada no es correcta.")
                res.status(401).json({error:error.message})
                return
            }
            const passwordEncrypted = await hashPassword(newPassword);
            await user.update({
                password: passwordEncrypted,
                token: null
            })
            res.status(200).json({message:"Contraseña actualizada correctamente"})
        }catch (error) {
            console.log(error)
            res.status(500).json({error:"Error al cambiar la contraseña"})
            return
        }
    }

    static async user(req: Request, res:Response){
        res.status(200).json(req.user)
    }
       
}