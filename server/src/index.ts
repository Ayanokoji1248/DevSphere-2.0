import express from "express";
import dotenv from "dotenv"
import cookieParse from "cookie-parser"
import authRouter from "./routes/auth.route";
import dbConnect from "./config/dbConnection";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())

app.use('/api/auth', authRouter)

async function main() {
    await dbConnect();
    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`)
    })
}

main();