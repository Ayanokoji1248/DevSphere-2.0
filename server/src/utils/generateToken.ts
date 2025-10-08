import jwt from "jsonwebtoken";

export const generateToken = (user: { _id: string, email: string }) => {
    const token = jwt.sign({ id: user._id as string, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    })
    return token;
}