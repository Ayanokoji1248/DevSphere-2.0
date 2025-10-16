import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { currentUser, getUser, updateUser } from "../controllers/user.controller";
const userRouter = Router();

userRouter.get('/me', userMiddleware, currentUser);

userRouter.get('/:id', userMiddleware, getUser);

userRouter.put("/:id", userMiddleware, updateUser)

export default userRouter