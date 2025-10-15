import mongoose, { model, Schema } from "mongoose";

const postSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    code: {
        type: String,
    },
    link: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }]

}, {
    timestamps: true
})

const Post = model("post", postSchema);

export default Post;