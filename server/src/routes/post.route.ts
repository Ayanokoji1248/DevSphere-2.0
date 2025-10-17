import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { allPosts, createPost, deletePost, getPost, likePost, unlikePost } from "../controllers/post.controller";
const postRouter = Router();

postRouter.post('/create', userMiddleware, createPost)

postRouter.get('/all', userMiddleware, allPosts)

postRouter.get('/:id', userMiddleware, getPost)

postRouter.delete("/:id", userMiddleware, deletePost)

postRouter.put('/:id/like', userMiddleware, likePost)

postRouter.put('/:id/unlike', userMiddleware, unlikePost)

export default postRouter;
