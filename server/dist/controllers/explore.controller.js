"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.explore = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const post_model_1 = __importDefault(require("../models/post.model"));
const project_model_1 = __importDefault(require("../models/project.model"));
const explore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q, type } = req.query;
        if (!q) {
            res.status(400).json({
                message: "Please provide a search query"
            });
            return;
        }
        let results = {};
        if (!type || type === "users") {
            results.users = yield user_model_1.default.find({
                $or: [
                    { fullName: { $regex: q, $options: "i" } },
                    { username: { $regex: q, $options: "i" } },
                    { headline: { $regex: q, $options: "i" } },
                    { skills: { $regex: q, $options: "i" } }
                ]
            }).select("fullName username headline skills profilePic following follower");
        }
        if (!type || type === "posts") {
            results.posts = yield post_model_1.default.find({
                text: { $regex: q, $options: "i" }
            }).populate("user", "username fullName profilePic");
        }
        if (!type || type === "projects") {
            results.projects = yield project_model_1.default.find({
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { description: { $regex: q, $options: "i" } },
                    { techStack: { $regex: q, $options: "i" } },
                ]
            }).populate("user", "username fullName profilePic");
        }
        res.status(200).json({
            message: "Search Result",
            results
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.explore = explore;
