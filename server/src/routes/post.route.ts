import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { allPosts, createPost } from "../controllers/post.controller";
const postRouter = Router();

postRouter.post('/create', userMiddleware, createPost)

postRouter.get('/all', userMiddleware, allPosts)

export default postRouter;
