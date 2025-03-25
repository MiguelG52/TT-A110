import { Router } from "express"
import { ProjectController } from '../controllers/Project.controller';
import { authorizeInsert } from "../middleware/team.middleware";
import { handleInputErrors } from "../middleware/validation.middleware";
import { body } from "express-validator";

const projectRouter  = Router();   

projectRouter.post("/create",
    body("userId").notEmpty().withMessage("El  id de usuario es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    authorizeInsert,
    handleInputErrors,
    ProjectController.createProject
)
projectRouter.delete("/delete/:projectId",
    authorizeInsert,
    handleInputErrors,
    ProjectController.deleteProject
)
projectRouter.put("/update/:projectId",
    authorizeInsert,
    handleInputErrors,
    ProjectController.updateProject
)
projectRouter.get("/get-project-by-id/:projectId",
    authorizeInsert,
    handleInputErrors,
    ProjectController.getProjectById
)


export default projectRouter