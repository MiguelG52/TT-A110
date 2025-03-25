import { Router } from "express"
import { UserController } from '../controllers/User.controller';
import { authorizeInsert } from "../middleware/team.middleware";

const userRouter  = Router();   

userRouter.get("/get-user-teams",
    authorizeInsert,
    UserController.getUserTeams
)
userRouter.get("/get-user-projects/:userId",
    authorizeInsert,
    UserController.getUserProjects
)


export default userRouter