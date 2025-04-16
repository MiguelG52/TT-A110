import { Router } from "express"
import { ProjectController } from '../controllers/Project.controller';
import { handleInputErrors } from "../middleware/validation.middleware";
import { body } from "express-validator";
import { authenticate } from "../middleware/auth.middleware";

const projectRouter  = Router();   

projectRouter.use(authenticate)

projectRouter.post("/create",
    body("userId").notEmpty().withMessage("El  id de usuario es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    handleInputErrors,
    ProjectController.createProject
)
projectRouter.delete("/delete/:projectId",
    handleInputErrors,
    ProjectController.deleteProject
)
projectRouter.put("/update/:projectId",
    handleInputErrors,
    ProjectController.updateProject
)
projectRouter.get("/get-project-by-id/:projectId",
    handleInputErrors,
    ProjectController.getProjectById
)


export default projectRouter