import { Router } from "express"
import userMiddleware from "../middlewares/user.middleware";
import { explore } from "../controllers/explore.controller";
const exploreRouter = Router()

exploreRouter.get('/', userMiddleware, explore)

export default exploreRouter;