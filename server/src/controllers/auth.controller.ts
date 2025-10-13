import { Request, Response } from "express"
import User from "../models/user.model";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken";
import { z } from "zod"
import { createUserFolder } from "../utils/generateUserFolder";

const userRegisterSchema = z.object({
    fullName: z.string().min(5, "Atleast 5 character required"),
    username: z.string().min(5, "Atleast 5 character required"),
    email: z.email("Invalid Email"),
    password: z.string().min(5, "Atleast 5 character"),
})

const userLoginSchema = userRegisterSchema.pick({
    email: true,
    password: true
})

export const userRegister = async (req: Request, res: Response) => {
    try {

        const { fullName, username, email, password } = req.body;

        const validation = userRegisterSchema.safeParse({ fullName, username, email, password });

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

        const userExist = await User.findOne({ email });

        if (userExist) {
            res.status(400).json({
                message: "Registration failed. Please try again with different credentials"
            })
            return
        }

        const hashPass = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            username,
            email,
            password: hashPass,
            profilePic: `https://api.dicebear.com/9.x/bottts/svg?seed=${username}`
        })
        await user.save();

        const token = generateToken({ _id: user._id.toString(), email: user.email })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000   // 1 day
        })

        const { password: _, ...userData } = user.toObject();

        await createUserFolder(user._id.toString())

        res.status(201).json({
            message: "User Register Successfully",
            user: userData
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const validation = userLoginSchema.safeParse({
            email, password
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

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const token = generateToken({ _id: user._id.toString(), email: user.email })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000   // 1 day
        })

        const { password: _, ...userData } = user.toObject()

        res.status(200).json({
            message: "User Login Successfully",
            user: userData
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict"
        });
        res.status(200).json({
            message: "User Logout"
        })
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}