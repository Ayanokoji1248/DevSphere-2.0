"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const post_controller_1 = require("../controllers/post.controller");
const postRouter = (0, express_1.Router)();
postRouter.post('/create', user_middleware_1.default, post_controller_1.createPost);
postRouter.get('/all', user_middleware_1.default, post_controller_1.allPosts);
postRouter.get('/:id', user_middleware_1.default, post_controller_1.getPost);
postRouter.delete("/:id", user_middleware_1.default, post_controller_1.deletePost);
postRouter.put('/:id/like', user_middleware_1.default, post_controller_1.likePost);
postRouter.put('/:id/unlike', user_middleware_1.default, post_controller_1.unlikePost);
exports.default = postRouter;
