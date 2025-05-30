import { Router } from "express"
import { ProjectController } from '../controllers/Project.controller';
import { handleInputErrors } from "../middleware/validation.middleware";
import { body } from "express-validator";
import { authenticate } from "../middleware/auth.middleware";
import { isProjectOwner, projectExists } from "../middleware/project.middleware";

const projectRouter  = Router();   

projectRouter.use(authenticate)

projectRouter.post("/create",
    body("userId").notEmpty().withMessage("El  id de usuario es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    handleInputErrors,
    ProjectController.createProject
)
projectRouter.get("/getProjectById/:projectId",
    ProjectController.getProjectById
  );
  
  projectRouter.put("/update/:projectId", 
    projectExists,
    isProjectOwner, 
    ProjectController.updateProject
  );
  
  projectRouter.delete("/delete/:projectId", 
    projectExists,
    isProjectOwner,
    ProjectController.deleteProject
  );
  
  projectRouter.get("/getMembers/:projectId/team/:teamId/",
    projectExists,
    ProjectController.getProjectMembers
  );

   projectRouter.put("/save-changes/:projectId",
    projectExists,
    ProjectController.updateImprovedCode
  );


export default projectRouter