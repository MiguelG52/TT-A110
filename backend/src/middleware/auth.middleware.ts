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

export const validateAuthorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
      // Verificar que existe el token JWT
      const jwt = req.headers.authorization?.split(' ')[1];
      if (!jwt) {
          return sendAuthError(res, "Token de autorización requerido", 401);
      }

      // Verificar el token JWT
      const userData = await verfyJWT(jwt);
      if (!userData || typeof userData !== 'object' || !('id' in userData)) {
          return sendAuthError(res, "Token inválido o expirado", 401);
      }

      // Manejar diferentes métodos HTTP
      switch (req.method) {
          case 'GET':
              return handleGetRequest(req, res, next, userData);
          case 'POST':
          case 'PUT':
          case 'DELETE':
              return handleModificationRequest(req, res, next, userData);
          default:
              return next(); // Permitir otros métodos sin validación adicional
      }
  } catch (err) {
      console.error("Auth error:", err);
      return sendAuthError(res, "Error de autorización", 500);
  }
};

// Manejo de solicitudes GET
const handleGetRequest = (req: Request, res: Response, next: NextFunction, userData: any) => {
  const { userId } = req.query;
  
  // Si no hay userId en el query, permitir el acceso
  if (!userId) {
      return next();
  }

  // Verificar que el usuario solicitante coincide con el userId del query
  if (userData.id !== userId) {
      return sendAuthError(res, "No autorizado para acceder a estos datos", 403);
  }

  return next();
};

// Manejo de solicitudes que modifican datos (POST, PUT, DELETE)
const handleModificationRequest = (req: Request, res: Response, next: NextFunction, userData: any) => {
  // Obtener userId de los parámetros o del body según el método
  const userId = req.params.userId || req.body.userId;
  
  if (!userId) {
      return sendAuthError(res, "Se requiere identificación del usuario", 400);
  }

  // Verificar que el usuario que hace la petición es el mismo que se va a modificar
  if (userData.id !== userId) {
      return sendAuthError(res, "No tienes permiso para realizar esta acción", 403);
  }

  return next();
};