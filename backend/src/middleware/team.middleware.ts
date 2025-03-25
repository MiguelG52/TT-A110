import { Request, Response, NextFunction } from "express";

export const authorizeInsert = (req: Request, res: Response, next: NextFunction) => {
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
    next();
};
