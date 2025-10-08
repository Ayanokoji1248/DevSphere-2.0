"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
        lowercase: true,
    }
}, { timestamps: true });
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
