"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const ai_controller_1 = require("../controllers/ai.controller");
const aiRouter = (0, express_1.Router)();
aiRouter.post('/review', user_middleware_1.default, ai_controller_1.reviewCode);
exports.default = aiRouter;
