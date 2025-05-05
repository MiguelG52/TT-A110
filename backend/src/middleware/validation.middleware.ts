import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
        return; 
    }
    next();
}