"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "post"
        }],
    follower: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user"
        }],
    following: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user"
        }]
}, { timestamps: true });
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
