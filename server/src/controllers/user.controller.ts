import { Request, Response } from "express";
import User from "../models/user.model";

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