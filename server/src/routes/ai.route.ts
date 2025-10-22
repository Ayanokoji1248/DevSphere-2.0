import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { reviewCode } from "../controllers/ai.controller";

const aiRouter = Router();

aiRouter.post('/review', userMiddleware, reviewCode)

export default aiRouter;