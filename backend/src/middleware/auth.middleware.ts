import type  {Request, Response, NextFunction} from 'express';
import { verfyJWT } from '../helpers/jwt.helper';
import User from '../models/user.model';
import { extractTokenFromHeader } from '../helpers/auth.helper';
import { sendAuthError } from '../helpers/errors.helper';
import Project from '../models/project.model';

declare global{
    namespace Express {
        interface Request{
            user?: User
            project?:Project
        }
    }
}

export const rejectAdminInjection = async (req: Request, res:Response, next: NextFunction)=> {
    const { roleId } = req.body;
    if(roleId == 1){
      sendAuthError(res,"No autorizado")
    }
    next()
}
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = extractTokenFromHeader(req.headers.authorization);
  
      if (!token) {
        sendAuthError(res, "No autorizado")
        return
      }
  
      const decodedToken = await verfyJWT(token);
  
      if (typeof decodedToken !== 'object' || !decodedToken.id) {
         sendAuthError(res, "Token no válido");
         return
      }
  
      const user = await User.findByPk(decodedToken.id, {
        attributes: ['userId', 'email', 'name', 'lastName', 'username','roleId'],
      });
  
      if (!user){
        sendAuthError(res, "Usuario no encontrado", 404)
        return
      }
  
      req.user = user;
      next();
    } catch (err) {
      console.error("Auth error:", err);
       sendAuthError(res, "Error al autenticar usuario", 500);
       return
    }
};

export const authenticateContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      sendAuthError(res, "No autorizado")
      return
    }

    const decodedToken = await verfyJWT(token);

    if (typeof decodedToken !== 'object' || !decodedToken.id) {
       sendAuthError(res, "Token no válido");
       return
    }
    next();
  } catch (err) {
    console.error("Auth error:", err);
     sendAuthError(res, "Error al autenticar usuario", 500);
     return
  }
};