import { Request, Response } from "express";
import Post from "../models/post.model";
import mongoose from "mongoose";

export const createPost = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const { text, code, link, imageUrl } = req.body;

        const post = new Post({
            text,
            code,
            link,
            imageUrl,
            user: userId
        })
        await post.save();
        await post.populate("user", "_id username fullName profilePic")

        res.status(201).json({
            message: "Post created successfully",
            post
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

export const allPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find({}).populate("user", "_id fullName username profilePic");

        res.status(200).json({
            message: "All Posts",
            posts
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

export const getPost = async (req: Request, res: Response) => {
    try {

        const postId = req.params.id;

        if (!postId || !mongoose.isValidObjectId(postId)) {
            res.status(400).json({
                message: "Invalid Post Id"
            })
            return
        }

        const post = await Post.findById(postId).populate("user", "_id username fullName profilePic");

        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            })
            return
        }

        res.status(200).json({
            message: "Post Found",
            post
        })
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id;

        if (!postId || !mongoose.isValidObjectId(postId)) {
            res.status(404).json({
                message: "Invalid Post Id"
            })
            return
        }

        const post = await Post.findOneAndDelete({ _id: postId, user: userId });
        if (!post) {
            res.status(404).json({ message: "Post not found or unauthorized" });
            return
        }
        res.status(200).json({ message: "Post deleted successfully" });
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const likePost = async (req: Request, res: Response) => {
    try {

        const postId = req.params.id;
        const userId = req.user.id;
        const objectUserId = new mongoose.Types.ObjectId(userId as string)
        const post = await Post.findById(postId);

        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            })
            return
        }

        const alreadyLike = post.likes.some(id => id.equals(objectUserId))

        if (alreadyLike) {
            res.status(200).json({
                message: "Already Like"
            })
            return
        }
        post.likes.push(objectUserId)

        await post.save();
        res.status(200).json({
            message: "Post Like Successfully",
            likes: post.likes.length
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const unlikePost = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const objectUserId = new mongoose.Types.ObjectId(userId as string)

        const post = await Post.findById(postId);

        if (!post) {
            res.status(404).json({
                message: "Post Not Found"
            })
            return
        }

        const alreadyLike = post.likes.some(id => id.equals(objectUserId));

        if (!alreadyLike) {
            res.status(400).json({
                message: "You haven't liked this post yet"
            })
            return
        }

        post.likes = post.likes.filter(id => !id.equals(objectUserId));

        await post.save();

        res.status(200).json({
            message: "Post Unliked successfully",
            likes: post.likes.length
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