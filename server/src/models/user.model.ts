import mongoose, { model, Schema } from "mongoose";
import { minLength } from "zod";

const userSchema = new Schema({
    bannerImage: {
        type: String,
        default: "banner"
    },
    profilePic: {
        type: String,
        default: "profile"
    },
    fullName: {
        type: String,
        required: true,
        minLength: [3, "Atleast 3 character"]
    },
    username: {
        type: String,
        required: true,
        minLength: [5, "Atleast 5 character"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    headline: {
        type: String,
        trim: true,
        minLength: [2, "Atleast 2 character"]
    },
    bio: {
        type: String,
        trim: true,
        minLength: [10, "Atleast 10 character"]
    },
    address: {
        type: String,
        trim: true,
    },
    portfolioLink: {
        type: String,
        trim: true,
    },
    skills: [{
        type: String,
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
}, { timestamps: true });

const User = model("user", userSchema);

export default User;