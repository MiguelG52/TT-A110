import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { body, param } from 'express-validator';
import { handleInputErrors } from "../middleware/validation.middleware";
import { limiter } from "../config/limiter";
import { authenticate, rejectAdminInjection } from "../middleware/auth.middleware";

const authRouter = Router();

//authRouter.use(limiter)

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
        .isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    handleInputErrors,
    rejectAdminInjection,
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

authRouter.post("/reset-password", 
    body("token")
        .notEmpty()
        .isLength({min:6,max:6})
        .withMessage("Token no válido"),
    body("password").notEmpty().withMessage("La contraseña no puede ir vacia")
        .isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    handleInputErrors,
    AuthController.resetPasswordWithToken
)
authRouter.put("/update-password/user/:userId",
    body("actualPassword").notEmpty().withMessage("La contraseña actual es requerida"),
    body("newPassword")
      .notEmpty().withMessage("La nueva contraseña es requerida")
      .isLength({ min: 8 }).withMessage("Mínimo 8 caracteres"),
    body("confirmPassword")
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage("Las contraseñas no coinciden"),
    authenticate,
    handleInputErrors,
    AuthController.updatePassword
  );
authRouter.get("/get-user-data", authenticate ,AuthController.user)

export default authRouter;