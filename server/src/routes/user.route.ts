import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { currentUser, followUser, getSuggestedUser, getUser, getUserFollowing, unfollowUser, updateUser } from "../controllers/user.controller";
const userRouter = Router();

userRouter.get('/me', userMiddleware, currentUser);

userRouter.get('/following', userMiddleware, getUserFollowing);

userRouter.get('/suggested-user', userMiddleware, getSuggestedUser)

userRouter.put("/update", userMiddleware, updateUser);

userRouter.get('/:id', userMiddleware, getUser);

userRouter.put('/follow/:id', userMiddleware, followUser);

userRouter.put('/unfollow/:id', userMiddleware, unfollowUser)

export default userRouter