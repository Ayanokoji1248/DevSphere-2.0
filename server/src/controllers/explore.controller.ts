import { Request, Response } from "express";
import User from "../models/user.model";
import Post from "../models/post.model";
import Project from "../models/project.model";

type ResultType = {
    users?: any[];
    posts?: any[];
    projects?: any[];
};

export const explore = async (req: Request, res: Response) => {
    try {
        const { q, type } = req.query
        if (!q) {
            res.status(400).json({
                message: "Please provide a search query"
            })
            return
        }

        let results: ResultType = {};

        if (!type || type === "users") {
            results.users = await User.find({
                $or: [
                    { fullName: { $regex: q, $options: "i" } },
                    { username: { $regex: q, $options: "i" } },
                    { headline: { $regex: q, $options: "i" } },
                    { skills: { $regex: q, $options: "i" } }
                ]
            }).select("fullName username headline skills profilePic")
        }

        if (!type || type === "posts") {
            results.posts = await Post.find({
                text: { $regex: q, $options: "i" }
            }).populate("user", "username fullName profilePic")
        }

        if (!type || type === "projects") {
            results.projects = await Project.find({
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { description: { $regex: q, $options: "i" } },
                    { techStack: { $regex: q, $options: "i" } },
                ]
            }).populate("user", "username fullName profilePic")
        }

        res.status(200).json({
            message: "Search Result",
            results
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}