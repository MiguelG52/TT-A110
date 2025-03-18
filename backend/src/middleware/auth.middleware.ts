import type  {Request, Response, NextFunction} from 'express';
import { verfyJWT } from '../helpers/jwt.helper';
import User from '../models/user.model';

declare global{
    namespace Express {
        interface Request{
            user?: User
        }
    }
}
export const authenticate = async(req:Request, res:Response, next:NextFunction) =>{
        const bearer  = req.headers.authorization
        if(!bearer){
            const error = new Error("No autorizado");
            res.status(401).json({error:error.message})
            return
        }
        const [, encondedToken] = bearer.split(' ');
        if(!encondedToken){
            const error = new Error("Token no válido")
            res.status(401).json({error:error.message})
            return
        }
        try {
            const decodedToken = await verfyJWT(encondedToken)
            if(typeof decodedToken === 'object' && decodedToken.id){
                req.user = await User.findByPk(decodedToken.id, {
                    attributes:['userId',"email","name","lastName","username"]
                })
                next()
            }
            
        } catch (error) {
            res.status(500).json({error:`Error al obtener información del usuario: ${error}`})
        }
}