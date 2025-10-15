import { Router } from "express"
import userMiddleware from "../middlewares/user.middleware";
import { createComment, deleteComment, getComments } from "../controllers/comment.controller";
const commentRouter = Router();

commentRouter.get('/:id', userMiddleware, getComments)

commentRouter.post('/create/:id', userMiddleware, createComment)

commentRouter.delete('/delete/:postId/:commentId', userMiddleware, deleteComment)

export default commentRouter;