import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { allPosts, createPost, deletePost } from "../controllers/post.controller";
const postRouter = Router();

postRouter.post('/create', userMiddleware, createPost)

postRouter.get('/all', userMiddleware, allPosts)

postRouter.delete("/:id", userMiddleware, deletePost)

export default postRouter;
