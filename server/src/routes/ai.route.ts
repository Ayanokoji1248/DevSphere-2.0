import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { askAboutCode, reviewCode } from "../controllers/ai.controller";

const aiRouter = Router();

aiRouter.post('/review', userMiddleware, reviewCode);

aiRouter.post('/followUp', userMiddleware, askAboutCode);

export default aiRouter;