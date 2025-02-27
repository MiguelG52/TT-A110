import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { body } from 'express-validator';
import { handleInputErrors } from "../middleware/validation.middleware";

const authRouter = Router();

authRouter.post('/create-account',
    body('name')
        .notEmpty().withMessage("El nombre no puede ir vacio"),
    body('lastName')
        .notEmpty().withMessage("El apellido no puede ir vacio"),
    body('email')
        .notEmpty().withMessage("El email no puede ir vacio"),
    body('email')
        .isEmail().withMessage("El email no es valido"),
    body('password')
        .notEmpty().withMessage("La contraseña no puede ir vacia"),
    body('password')
        .isLength({min:10}).withMessage("La contraseña debe tener al menos 10 caracteres"),
    handleInputErrors,
    AuthController.createUser
);

export default authRouter;