import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { currentUser, getUser } from "../controllers/user.controller";
const userRouter = Router();

userRouter.get('/me', userMiddleware, currentUser);

userRouter.get('/:id', userMiddleware, getUser);

export default userRouter