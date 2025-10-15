import { Request, Response } from "express";
import mongoose from "mongoose";
import Comment from "../models/comment.model";
import Post from "../models/post.model";

export const createComment = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const userId = req.user.id;
        const postId = req.params.id;

        if (!postId || !mongoose.isValidObjectId(postId)) {
            res.status(404).json({
                message: "Invalid post id or Not found"
            })
            return
        }

        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            })
            return
        }

        const comment = new Comment({
            text,
            user: userId,
            post: postId
        })
        post.comments.push(comment._id);
        await comment.save();
        await post.save();
        await comment.populate("user", "_id fullName username profilePic");

        res.status(201).json({
            message: "Comment created",
            comment
        })
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const getComments = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id
        if (!postId || !mongoose.isValidObjectId(postId)) {
            res.status(400).json({
                message: "Post Id is invalid"
            })
            return
        }

        const post = await Post.findById(postId);

        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            })
            return
        }

        const comments = await Comment.find({ post: postId }).populate("user", "_id username fullName profilePic");

        res.status(200).json({
            message: "Comments Found",
            comments
        })
        return

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;
        const commentId = req.params.commentId

        if (!postId || !mongoose.isValidObjectId(postId)) {
            res.status(404).json({
                message: "Invalid Post Id"
            })
            return
        }

        const post = await Post.findById(postId);

        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            })
            return
        }

        if (!commentId || !mongoose.isValidObjectId(commentId)) {
            res.status(404).json({
                message: "Invalid Comment Id or Not Found"
            })
            return
        }
        const comment = await Comment.findOneAndDelete({ _id: commentId, user: userId, post: postId });

        if (!comment) {
            res.status(500).json({
                message: "Comment Not Found"
            })
            return
        }

        res.status(200).json({
            message: "Comment Deleted successfully"
        })
        return


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}