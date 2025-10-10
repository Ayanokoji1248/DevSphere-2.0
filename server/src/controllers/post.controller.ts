import { Request, Response } from "express";
import Post from "../models/post.model";

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

        res.status(201).json({
            message: "Post created successfully"
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

