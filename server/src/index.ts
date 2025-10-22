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
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);
app.use('/api/project', projectRouter);
app.use('/api/explore', exploreRouter);
app.use('/api/ai', aiRouter);

async function main() {
    await dbConnect();
    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`)
    })
}

main();