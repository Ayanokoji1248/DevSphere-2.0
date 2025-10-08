import { model, Schema } from "mongoose";

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
    }
}, { timestamps: true });

const User = model("user", userSchema);

export default User;