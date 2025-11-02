"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/me', user_middleware_1.default, user_controller_1.currentUser);
userRouter.get('/following', user_middleware_1.default, user_controller_1.getUserFollowing);
userRouter.get('/suggested-user', user_middleware_1.default, user_controller_1.getSuggestedUser);
userRouter.put("/update", user_middleware_1.default, user_controller_1.updateUser);
userRouter.get('/:id', user_middleware_1.default, user_controller_1.getUser);
userRouter.put('/follow/:id', user_middleware_1.default, user_controller_1.followUser);
userRouter.put('/unfollow/:id', user_middleware_1.default, user_controller_1.unfollowUser);
exports.default = userRouter;
