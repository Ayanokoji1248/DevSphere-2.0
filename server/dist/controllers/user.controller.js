"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollowUser = exports.followUser = exports.updateUser = exports.getUser = exports.currentUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const user = yield user_model_1.default.findById(userId).select("-password");
        res.status(200).json({
            message: "Current User",
            user
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.currentUser = currentUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({
                message: "Invalid User Id"
            });
            return;
        }
        const user = yield user_model_1.default.findById(id).select('-password');
        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            });
            return;
        }
        res.status(200).json({
            message: "User Found",
            user
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { bannerImage, profilePic, fullName, username, headline, bio, address, portfolioLink, skills } = req.body;
        const user = yield user_model_1.default.findByIdAndUpdate(userId, {
            bannerImage,
            profilePic,
            fullName,
            username,
            headline,
            bio,
            address,
            portfolioLink,
            skills
        }, { new: true }).select('-password');
        if (!user) {
            res.status(404).json({
                message: "Invalid User"
            });
            return;
        }
        res.status(200).json({
            message: "User Updated successfully",
            user
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.updateUser = updateUser;
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const otherUserId = req.params.id;
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const otherUserObjectId = new mongoose_1.default.Types.ObjectId(otherUserId);
        const user = yield user_model_1.default.findById(userId);
        if (!otherUserId || !mongoose_1.default.isValidObjectId(otherUserId)) {
            res.status(404).json({
                message: "User Not Found or Invalid Id"
            });
            return;
        }
        if (userId === otherUserId) {
            res.status(400).json({
                message: "You cannot follow yourself"
            });
            return;
        }
        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            });
            return;
        }
        const alreadyFollow = user.following.some(id => id.equals(otherUserObjectId));
        if (alreadyFollow) {
            res.status(200).json({
                message: "Already Follow"
            });
            return;
        }
        const otherUser = yield user_model_1.default.findById(otherUserId);
        if (!otherUser) {
            res.status(404).json({
                message: "User Not Found"
            });
            return;
        }
        user.following.push(otherUserObjectId);
        otherUser.follower.push(userObjectId);
        yield user.save();
        yield otherUser.save();
        res.status(200).json({
            message: "Followed User Successfully"
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.followUser = followUser;
const unfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const otherUserId = req.params.id;
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const otherUserObjectId = new mongoose_1.default.Types.ObjectId(otherUserId);
        if (!otherUserId || !mongoose_1.default.isValidObjectId(otherUserId)) {
            res.status(404).json({
                message: "User Not Found or Invalid Id"
            });
            return;
        }
        if (userId === otherUserId) {
            res.status(400).json({
                message: "You cannot unfollow yourself"
            });
            return;
        }
        const user = yield user_model_1.default.findById(userId);
        const otherUser = yield user_model_1.default.findById(otherUserId);
        if (!user || !otherUser) {
            res.status(404).json({
                message: "User Not Found"
            });
            return;
        }
        const isFollowing = user.following.some(id => id.equals(otherUserObjectId));
        if (!isFollowing) {
            res.status(400).json({
                message: "You are not following this user"
            });
            return;
        }
        user.following = user.following.filter(id => !id.equals(otherUserId));
        otherUser.follower = otherUser.follower.filter(id => !id.equals(userObjectId));
        yield user.save();
        yield otherUser.save();
        res.status(200).json({
            message: "User Unfollowed Successfully"
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.unfollowUser = unfollowUser;
