import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error in connecting DB", error);
        process.exit(1);
    }
}

export default dbConnect;