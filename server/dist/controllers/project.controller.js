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
exports.getAllProject = exports.deleteProject = exports.getProject = exports.createProject = void 0;
const zod_1 = __importDefault(require("zod"));
const project_model_1 = __importDefault(require("../models/project.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const projectValidationSchema = zod_1.default.object({
    projectImage: zod_1.default.string(),
    title: zod_1.default.string().min(1, 'Title required'),
    description: zod_1.default.string().min(10, "Minimum 10 characters"),
    githubLink: zod_1.default.string().optional(),
    projectLink: zod_1.default.string().optional(),
    techStack: zod_1.default.array(zod_1.default.string()),
    status: zod_1.default.string(),
    category: zod_1.default.string()
});
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectImage, title, description, githubLink, projectLink, techStack, status, category } = req.body;
        const userId = req.user.id;
        const validation = projectValidationSchema.safeParse({
            projectImage, title, description, githubLink, projectLink, techStack, status, category
        });
        if (!validation.success) {
            const issues = validation.error.issues.map((err) => ({
                field: err.path[0],
                message: err.message
            }));
            res.status(400).json({
                message: "Validation Error",
                error: issues
            });
            return;
        }
        const project = new project_model_1.default({
            projectImage,
            title,
            description,
            githubLink,
            projectLink,
            techStack,
            status,
            category,
            user: userId
        });
        yield project.save();
        yield project.populate("user", "_id username fullName profilePic");
        res.status(201).json({
            message: "Project Created Successfully",
            project
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.createProject = createProject;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;
        if (!projectId || !mongoose_1.default.isValidObjectId(projectId)) {
            res.status(404).json({
                message: "Invalid Project Id or Project Id not found"
            });
            return;
        }
        const project = yield project_model_1.default.findOne({ _id: projectId }).populate("user", "_id username fullName profilePic");
        if (!project) {
            res.status(404).json({
                message: "Project Not Found"
            });
            return;
        }
        res.status(200).json({
            message: "Project Found",
            project
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.getProject = getProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;
        if (!projectId || !mongoose_1.default.isValidObjectId(projectId)) {
            res.status(404).json({
                message: "Project Id is Invalid or not found"
            });
            return;
        }
        const project = yield project_model_1.default.findOneAndDelete({ user: userId, _id: projectId });
        if (!project) {
            res.status(404).json({
                message: "Project Not Found"
            });
            return;
        }
        res.status(200).json({
            message: "Project Deleted Successfully"
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.deleteProject = deleteProject;
const getAllProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_model_1.default.find({}).populate("user", "_id username fullName profilePic");
        res.status(200).json({
            message: "All Projects",
            projects
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.getAllProject = getAllProject;
