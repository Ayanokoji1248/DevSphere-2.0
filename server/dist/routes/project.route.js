"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const project_controller_1 = require("../controllers/project.controller");
const projectRouter = (0, express_1.Router)();
projectRouter.post('/create', user_middleware_1.default, project_controller_1.createProject);
projectRouter.get('/:id', user_middleware_1.default, project_controller_1.getProject);
projectRouter.delete('/:id', user_middleware_1.default, project_controller_1.deleteProject);
exports.default = projectRouter;
