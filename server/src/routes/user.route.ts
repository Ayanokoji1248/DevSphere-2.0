import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { currentUser } from "../controllers/user.controller";
const userRouter = Router();

userRouter.get('/me', userMiddleware, currentUser)

export default userRouter