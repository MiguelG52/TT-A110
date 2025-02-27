import type { Request, Response } from 'express';
import  User  from '../models/user.model';
import { hashPassword } from '../helpers/auth.helper';

export class AuthController {
    static async createUser(req: Request, res: Response) {
        
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
            user.dataValues.password = passwordEncrypted;
            await user.save();
            res.status(201).json('Cuenta creada exitosamente');
        } catch (error) {
            res.status(500).json('Error en el servidor');
        }
    }
}