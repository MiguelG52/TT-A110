import { Router } from "express";
import { authenticate  } from "../middleware/auth.middleware";
import { MultimediaController } from "../controllers/Multimedia.controller";

const multimediaRouter = Router();
multimediaRouter.use(authenticate)
//multimediaRouter.use(limiter)


multimediaRouter.post("/create-content-type", MultimediaController.createContentType)
multimediaRouter.post("/create-content", MultimediaController.createContent)
multimediaRouter.delete("/create-content", MultimediaController.deleteContent)

export default multimediaRouter;