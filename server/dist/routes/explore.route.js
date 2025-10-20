"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const explore_controller_1 = require("../controllers/explore.controller");
const exploreRouter = (0, express_1.Router)();
exploreRouter.get('/', user_middleware_1.default, explore_controller_1.explore);
exports.default = exploreRouter;
