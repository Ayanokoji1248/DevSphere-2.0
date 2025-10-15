import mongoose, { model, Schema } from "mongoose";

const commentSchema = new Schema({
    text: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }
}, { timestamps: true })

const Comment = model("comment", commentSchema);

export default Comment