import { Router } from "express";
import { body } from 'express-validator';
import { handleInputErrors } from "../middleware/validation.middleware";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth.middleware";
import { TeamController } from "../controllers/Team.controller";
import { authorizeInsert } from "../middleware/team.middleware";

const teamRouter = Router();

teamRouter.post('/create',
    authorizeInsert,
    body('name')
        .notEmpty().withMessage("El nombre del equipo no puede ir vacio."),
    body('description')
        .notEmpty().withMessage("La descripción no puede ir vacia."),
    body('userId')
        .notEmpty().withMessage("El id del usuario no puede ser null"),
    handleInputErrors,
    TeamController.createTeam
);

teamRouter.post("/add-user",
    body('userId')
        .notEmpty().withMessage("El id del usuario no puede ir vacio."),
    body('teamId')
        .notEmpty().withMessage("El id del equipo no puede ir vacio."),
    authorizeInsert,
    TeamController.addUserToTeam
)

teamRouter.get("/get-members",
    authorizeInsert,
    TeamController.getTeamMembers
)


export default teamRouter;