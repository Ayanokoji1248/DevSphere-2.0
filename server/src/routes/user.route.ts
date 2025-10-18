import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { currentUser, followUser, getUser, unfollowUser, updateUser } from "../controllers/user.controller";
const userRouter = Router();

userRouter.get('/me', userMiddleware, currentUser);

userRouter.get('/:id', userMiddleware, getUser);

userRouter.put("/:id", userMiddleware, updateUser);

userRouter.put('/follow/:id', userMiddleware, followUser);

userRouter.put('/unfollow/:id', userMiddleware, unfollowUser)

export default userRouter