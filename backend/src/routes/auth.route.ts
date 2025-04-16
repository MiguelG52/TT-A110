import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { body, param } from 'express-validator';
import { handleInputErrors } from "../middleware/validation.middleware";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.use(limiter)

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
    AuthController.createAccount
);

authRouter.post("/confirm-account",
    body("token")
        .notEmpty()
        .isLength({min:6,max:6})
        .withMessage("Token no válido"),

    handleInputErrors,
    AuthController.confirmAccount
)

authRouter.post("/login",
    body("email").notEmpty().withMessage("El email no puede ir vacio"),
    body("email").isEmail().withMessage("El email no es válido"),
    body("password").notEmpty().withMessage("La contraseña no puede ir vacia"),
    AuthController.loginAccount
)

authRouter.post("/forgot-password",
    body("email").isEmail().withMessage("El email no es válido"),
    handleInputErrors,
    AuthController.forgotPassword
)

authRouter.post("/validate-token",
    body("token")
        .notEmpty()
        .isLength({min:6,max:6})
        .withMessage("Token no válido"),
        handleInputErrors,
    AuthController.verifyToken
)

authRouter.post("/reset-password/:token", 
    param("token")
        .notEmpty()
        .isLength({min:6,max:6})
        .withMessage("Token no válido"),
    body("newPassword").notEmpty().withMessage("La contraseña no puede ir vacia")
        .isLength({min:10}).withMessage("La contraseña debe tener al menos 10 caracteres"),
    handleInputErrors,
    AuthController.resetPasswordWithToken
)
authRouter.post("/update-password", 
    body("currentPassword").notEmpty().withMessage("La contraseña no puede ir vacia"),
    body("newPassword").notEmpty().withMessage("La contraseña no puede ir vacia")
        .isLength({min:10}).withMessage("La contraseña debe tener al menos 10 caracteres"),
    authenticate,
    handleInputErrors,
    AuthController.resetPasswordWithToken
)

authRouter.get("/user", authenticate ,AuthController.user)

export default authRouter;