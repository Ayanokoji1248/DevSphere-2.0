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
exports.unlikePost = exports.likePost = exports.deletePost = exports.getPost = exports.allPosts = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { text, code, link, imageUrl } = req.body;
        const post = new post_model_1.default({
            text,
            code,
            link,
            imageUrl,
            user: userId
        });
        yield post.save();
        yield post.populate("user", "_id username fullName profilePic");
        res.status(201).json({
            message: "Post created successfully",
            post
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
exports.createPost = createPost;
const allPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.default.find({}).populate("user", "_id fullName username profilePic");
        res.status(200).json({
            message: "All Posts",
            posts
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
exports.allPosts = allPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!postId || !mongoose_1.default.isValidObjectId(postId)) {
            res.status(400).json({
                message: "Invalid Post Id"
            });
            return;
        }
        const post = yield post_model_1.default.findById(postId).populate("user", "_id username fullName profilePic");
        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            });
            return;
        }
        res.status(200).json({
            message: "Post Found",
            post
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.getPost = getPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const postId = req.params.id;
        if (!postId || !mongoose_1.default.isValidObjectId(postId)) {
            res.status(404).json({
                message: "Invalid Post Id"
            });
            return;
        }
        const post = yield post_model_1.default.findOneAndDelete({ _id: postId, user: userId });
        if (!post) {
            res.status(404).json({ message: "Post not found or unauthorized" });
            return;
        }
        res.status(200).json({ message: "Post deleted successfully" });
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
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const objectUserId = new mongoose_1.default.Types.ObjectId(userId);
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            });
            return;
        }
        const alreadyLike = post.likes.some(id => id.equals(objectUserId));
        if (alreadyLike) {
            res.status(200).json({
                message: "Already Like"
            });
            return;
        }
        post.likes.push(objectUserId);
        yield post.save();
        res.status(200).json({
            message: "Post Like Successfully",
            likes: post.likes.length
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
exports.likePost = likePost;
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const objectUserId = new mongoose_1.default.Types.ObjectId(userId);
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            });
            return;
        }
        const alreadyLike = post.likes.some(id => id.equals(objectUserId));
        if (!alreadyLike) {
            res.status(400).json({
                message: "You haven't liked this post yet"
            });
            return;
        }
        post.likes = post.likes.filter(id => !id.equals(objectUserId));
        yield post.save();
        res.status(200).json({
            message: "Post Unliked successfully",
            likes: post.likes.length
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
exports.unlikePost = unlikePost;
