import { Request, Response } from "express";
import z from "zod";
import Project from "../models/project.model";
import mongoose from "mongoose";

const projectValidationSchema = z.object({
    projectImage: z.string(),
    title: z.string().min(1, 'Title required'),
    description: z.string().min(10, "Minimum 10 characters"),
    githubLink: z.string().optional(),
    projectLink: z.string().optional(),
    techStack: z.array(z.string()),
    status: z.string(),
    category: z.string()
})

export const createProject = async (req: Request, res: Response) => {
    try {
        const { projectImage, title, description, githubLink, projectLink, techStack, status, category } = req.body;
        const userId = req.user.id

        const validation = projectValidationSchema.safeParse({
            projectImage, title, description, githubLink, projectLink, techStack, status, category
        })

        if (!validation.success) {
            const issues = validation.error.issues.map((err) => ({
                field: err.path[0],
                message: err.message
            }))
            res.status(400).json({
                message: "Validation Error",
                error: issues
            })
            return
        }

        const project = new Project({
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

        await project.save()
        await project.populate("user", "_id username fullName profilePic")

        res.status(201).json({
            message: "Project Created Successfully",
            project
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

export const getProject = async (req: Request, res: Response) => {
    try {

        const projectId = req.params.id;
        const userId = req.user.id;

        if (!projectId || !mongoose.isValidObjectId(projectId)) {
            res.status(404).json({
                message: "Invalid Project Id or Project Id not found"
            })
            return
        }

        const project = await Project.findOne({ user: userId, _id: projectId }).populate("user", "_id username fullName profilePic");

        if (!project) {
            res.status(404).json({
                message: "Project Not Found"
            })
            return
        }

        res.status(200).json({
            message: "Project Found",
            project
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;

        if (!projectId || !mongoose.isValidObjectId(projectId)) {
            res.status(404).json({
                message: "Project Id is Invalid or not found"
            })
            return
        }

        const project = await Project.findOneAndDelete({ user: userId, _id: projectId });

        if (!project) {
            res.status(404).json({
                message: "Project Not Found"
            })
            return
        }

        res.status(200).json({
            message: "Project Deleted Successfully"
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