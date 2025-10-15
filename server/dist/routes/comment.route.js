"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const comment_controller_1 = require("../controllers/comment.controller");
const commentRouter = (0, express_1.Router)();
commentRouter.get('/:id', user_middleware_1.default, comment_controller_1.getComments);
commentRouter.post('/create/:id', user_middleware_1.default, comment_controller_1.createComment);
commentRouter.delete('/delete/:postId/:commentId', user_middleware_1.default, comment_controller_1.deleteComment);
exports.default = commentRouter;
