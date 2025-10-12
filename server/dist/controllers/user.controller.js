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
exports.getUser = exports.currentUser = void 0;
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
