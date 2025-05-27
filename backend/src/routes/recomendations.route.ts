import { Router } from "express";
import { body } from 'express-validator';
import { handleInputErrors } from "../middleware/validation.middleware";
import { limiter } from "../config/limiter";
import { authenticateContent } from "../middleware/auth.middleware";
import { RecommendationsController } from "../controllers/Recomendations.Controller";

const recomendationsRouter = Router();
 recomendationsRouter.use(authenticateContent) 
 recomendationsRouter.use(limiter);
 recomendationsRouter.post('/generate',
    body('javaCode')
        .notEmpty().withMessage("El campo del codigo no puede ir vacio."),
    handleInputErrors,
    RecommendationsController.getRecommendations
);




export default recomendationsRouter;