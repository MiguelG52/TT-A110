import { Router } from "express"
import { UserController } from '../controllers/User.controller';
import { authenticate } from "../middleware/auth.middleware";

const userRouter  = Router();   

userRouter.use(authenticate)

userRouter.get("/get-user-teams",
    UserController.getUserTeams
)
userRouter.get("/get-user-projects/:userId",
    UserController.getUserProjects
)


export default userRouter