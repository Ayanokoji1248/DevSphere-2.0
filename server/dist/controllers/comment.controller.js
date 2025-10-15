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
exports.deleteComment = exports.getComments = exports.createComment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const post_model_1 = __importDefault(require("../models/post.model"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const userId = req.user.id;
        const postId = req.params.id;
        if (!postId || !mongoose_1.default.isValidObjectId(postId)) {
            res.status(404).json({
                message: "Invalid post id or Not found"
            });
            return;
        }
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            });
            return;
        }
        const comment = new comment_model_1.default({
            text,
            user: userId,
            post: postId
        });
        post.comments.push(comment._id);
        yield comment.save();
        yield post.save();
        yield comment.populate("user", "_id fullName username profilePic");
        res.status(201).json({
            message: "Comment created",
            comment
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
exports.createComment = createComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!postId || !mongoose_1.default.isValidObjectId(postId)) {
            res.status(400).json({
                message: "Post Id is invalid"
            });
            return;
        }
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            });
            return;
        }
        const comments = yield comment_model_1.default.find({ post: postId }).populate("user", "_id username fullName profilePic");
        res.status(200).json({
            message: "Comments Found",
            comments
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
exports.getComments = getComments;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        if (!postId || !mongoose_1.default.isValidObjectId(postId)) {
            res.status(404).json({
                message: "Invalid Post Id"
            });
            return;
        }
        const post = yield post_model_1.default.findById(postId);
        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            });
            return;
        }
        if (!commentId || !mongoose_1.default.isValidObjectId(commentId)) {
            res.status(404).json({
                message: "Invalid Comment Id or Not Found"
            });
            return;
        }
        const comment = yield comment_model_1.default.findOneAndDelete({ _id: commentId, user: userId, post: postId });
        if (!comment) {
            res.status(500).json({
                message: "Comment Not Found"
            });
            return;
        }
        res.status(200).json({
            message: "Comment Deleted successfully"
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
exports.deleteComment = deleteComment;
