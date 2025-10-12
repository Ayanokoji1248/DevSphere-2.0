import { Request, Response } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";

export const currentUser = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        res.status(200).json({
            message: "Current User",
            user
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        if (!id || !mongoose.isValidObjectId(id)) {
            res.status(400).json({
                message: "Invalid User Id"
            })
            return
        }

        const user = await User.findById(id).select('-password');

        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            })
            return
        }

        res.status(200).json({
            message: "User Found",
            user
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}