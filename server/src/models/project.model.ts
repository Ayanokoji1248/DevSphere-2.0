import mongoose, { model, Schema } from "mongoose";

const projectSchema = new Schema({
    projectImage: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    githubLink: {
        type: String,
        trim: true
    },
    projectLink: {
        type: String,
        trim: true
    },
    techStack: [{
        type: String,
        default: []
    }],
    status: {
        type: String,
        enum: ["Planning", "In Progress", "Completed"],
        default: "In Progress"
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const Project = model("project", projectSchema);

export default Project