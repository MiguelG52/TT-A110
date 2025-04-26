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
projectRouter.get("/getProjectById",
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
  
  projectRouter.get("/addMember/:projectId/team/:teamId/members",
    projectExists,
    ProjectController.addTeamMembersToProject
  );


export default projectRouter