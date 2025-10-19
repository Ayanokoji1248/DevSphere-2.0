import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware";
import { createProject, deleteProject, getProject } from "../controllers/project.controller";
const projectRouter = Router();

projectRouter.post('/create', userMiddleware, createProject);

projectRouter.get('/:id', userMiddleware, getProject);

projectRouter.delete('/:id', userMiddleware, deleteProject)

export default projectRouter;