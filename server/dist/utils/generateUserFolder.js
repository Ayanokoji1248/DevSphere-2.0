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
exports.createUserFolder = void 0;
// utils/createUserFolder.ts
const supabaseConfig_js_1 = __importDefault(require("../config/supabaseConfig.js"));
const createUserFolder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ create a small placeholder file
        const buffer = Buffer.from("Initialized user folder", "utf-8");
        const { data, error } = yield supabaseConfig_js_1.default.storage
            .from("DevSphere2") // make sure bucket name matches exactly (case-sensitive)
            .upload(`${userId}/.init.md`, buffer, {
            contentType: "text/markdown",
            upsert: false, // prevents overwriting
        });
        if (error) {
            if (error.message.includes("already exists")) {
                console.log(`Folder already exists for user: ${userId}`);
                return;
            }
            throw error;
        }
        // console.log(`✅ Folder created for user: ${userId}`);
    }
    catch (error) {
        console.error("❌ Error creating user folder:", error.message);
    }
});
exports.createUserFolder = createUserFolder;
