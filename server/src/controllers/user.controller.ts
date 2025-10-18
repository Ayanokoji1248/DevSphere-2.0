import { Request, Response } from "express";
import User from "../models/user.model";
import mongoose, { ObjectId } from "mongoose";

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

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { bannerImage, profilePic, fullName, username, headline, bio, address, portfolioLink, skills } = req.body;

        const user = await User.findByIdAndUpdate(userId, {
            bannerImage,
            profilePic,
            fullName,
            username,
            headline,
            bio,
            address,
            portfolioLink,
            skills
        }, { new: true }).select('-password');

        if (!user) {
            res.status(404).json({
                message: "Invalid User"
            })
            return
        }

        res.status(200).json({
            message: "User Updated successfully",
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

export const followUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const otherUserId = req.params.id;

        const userObjectId = new mongoose.Types.ObjectId(userId as string)
        const otherUserObjectId = new mongoose.Types.ObjectId(otherUserId)

        const user = await User.findById(userId);

        if (!otherUserId || !mongoose.isValidObjectId(otherUserId)) {
            res.status(404).json({
                message: "User Not Found or Invalid Id"
            })
            return
        }

        if (userId === otherUserId) {
            res.status(400).json({
                message: "You cannot follow yourself"
            })
            return
        }

        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            })
            return
        }



        const alreadyFollow = user.following.some(id => id.equals(otherUserObjectId));

        if (alreadyFollow) {
            res.status(200).json({
                message: "Already Follow"
            })
            return
        }

        const otherUser = await User.findById(otherUserId)
        if (!otherUser) {
            res.status(404).json({
                message: "User Not Found"
            })
            return
        }

        user.following.push(otherUserObjectId)
        otherUser.follower.push(userObjectId)
        await user.save();
        await otherUser.save();
        res.status(200).json({
            message: "Followed User Successfully"
        })
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

export const unfollowUser = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id;
        const otherUserId = req.params.id;

        const userObjectId = new mongoose.Types.ObjectId(userId as string);
        const otherUserObjectId = new mongoose.Types.ObjectId(otherUserId);

        if (!otherUserId || !mongoose.isValidObjectId(otherUserId)) {
            res.status(404).json({
                message: "User Not Found or Invalid Id"
            })
            return
        }

        if (userId === otherUserId) {
            res.status(400).json({
                message: "You cannot unfollow yourself"
            })
            return
        }

        const user = await User.findById(userId);
        const otherUser = await User.findById(otherUserId);

        if (!user || !otherUser) {
            res.status(404).json({
                message: "User Not Found"
            })
            return
        }

        const isFollowing = user.following.some(id => id.equals(otherUserObjectId));

        if (!isFollowing) {
            res.status(400).json({
                message: "You are not following this user"
            })
            return
        }

        user.following = user.following.filter(id => !id.equals(otherUserId));
        otherUser.follower = otherUser.follower.filter(id => !id.equals(userObjectId));

        await user.save();
        await otherUser.save();

        res.status(200).json({
            message: "User Unfollowed Successfully"
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