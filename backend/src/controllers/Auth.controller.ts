import type { Request, Response } from 'express';
import  User  from '../models/user.model';
import { hashPassword } from '../helpers/auth.helper';
import { generateToken } from '../helpers/token.helper';
import { EmailService } from '../services/Email.Service';

export class AuthController {
    static async createUser(req: Request, res: Response) {    
        //validate if email is already registered
        const { email, password } = req.body;
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            const error = new Error('El usuario ya existe');
            res.status(400).json({error:error.message});
        }
        // Create user
        try {
            const user = new User(req.body);
            const passwordEncrypted = await hashPassword(password);
            const token = generateToken();
            user.dataValues.token = token;
            user.dataValues.password = passwordEncrypted;
            await user.save();
            await EmailService.sendEmailConfirmacion({
                name:user.dataValues.name,
                email: user.dataValues.email,
                token: user.dataValues.token
            })
            res.status(201).json('Cuenta creada exitosamente');
        } catch (error) {
            res.status(500).json({
                message:"Error al crear usuario",
            });
        }
    }

    static async confirmAccount(req: Request, res: Response) {
        try {
            const { token } = req.body;
            const user = await User.findOne({ where: { token } });
            if (!user) {
                res.status(404).json({ error: "Token no válido" });
            }
            // update user fields
            await user.update({
                token:null,
                isVerified:true
            })
            res.json({ message: "Cuenta verificada correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al confirmar la cuenta" });
        }
    }
    
}