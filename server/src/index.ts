import express from "express";
import dotenv from "dotenv"
import cookieParse from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route";
import dbConnect from "./config/dbConnection";
import postRouter from "./routes/post.route";
import userRouter from "./routes/user.route";
import commentRouter from "./routes/comment.route";
import projectRouter from "./routes/project.route";
import exploreRouter from "./routes/explore.route";
import aiRouter from "./routes/ai.route";
import { createServer } from "http"
import { Server } from "socket.io";
import { logsential } from "@axel12/log-sential-agent";
dotenv.config();
const app = express();

const allowedUrl = [process.env.FRONTEND_URL as string, "http://localhost:5173"]

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: allowedUrl,
        credentials: true
    }
})

// this should be in .env file
// this is will only work in local rn havent add to env in render
app.use(logsential({
    projectId: process.env.PROJECT_ID!,
    apiKey: process.env.API_KEY!,
    collectorUrl: process.env.COLLECTOR_URL!
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(cors({
    origin: allowedUrl,
    credentials: true
}))
console.log(process.env.FRONTEND_URL)

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);
app.use('/api/project', projectRouter);
app.use('/api/explore', exploreRouter);
app.use('/api/ai', aiRouter);

const users = new Map<string, string>();

io.on("connection", (socket) => {
    console.log("A user is connected: ", socket.id);

    socket.on("register", (userId) => {
        users.set(userId, socket.id)
    })

    socket.on("private-chat", ({ senderId, receiverId, message }) => {
        const targetedUser = users.get(receiverId);

        if (targetedUser) {
            io.to(targetedUser).emit("private-chat", { senderId, message })
        } else {
            console.log("User is offline")
        }
        // socket.emit("private-chat", { receiverId, message })
    })

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id)
        for (const [userId, socketId] of users.entries()) {
            if (socketId === socket.id) users.delete(userId)
        }
    })
})

async function main() {
    await dbConnect();
    server.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`)
    })
}

main();