import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user: {
                id: String,
                email: String
            }
        }
    }
}


const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(400).json({
                message: "Token Required"
            })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & {
            id: string;
            email: string;
        }

        req.user = decoded

        next();

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Token Not Found"
        })
    }
}

export default userMiddleware;