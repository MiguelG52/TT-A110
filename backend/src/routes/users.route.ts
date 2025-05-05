import { Router } from "express"
import { UserController } from '../controllers/User.controller';
import { authenticate } from "../middleware/auth.middleware";

const userRouter  = Router();   

userRouter.use(authenticate)

userRouter.get("/get-user-teams",
    UserController.getUserTeams
)
userRouter.get("/get-user-projects",
    UserController.getUserProjects
)

userRouter.get("/get-stadistics",
    UserController.getDashboardStats
)
userRouter.get("/get-all-teams",
    UserController.getAllUserTeams
)

userRouter.put("/update-data",
    UserController.updateUser
)
export default userRouter