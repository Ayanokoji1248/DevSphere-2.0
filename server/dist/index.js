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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const comment_route_1 = __importDefault(require("./routes/comment.route"));
const project_route_1 = __importDefault(require("./routes/project.route"));
const explore_route_1 = __importDefault(require("./routes/explore.route"));
const ai_route_1 = __importDefault(require("./routes/ai.route"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const log_sential_agent_1 = require("@axel12/log-sential-agent");
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedUrl = [process.env.FRONTEND_URL, "http://localhost:5173"];
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedUrl,
        credentials: true
    }
});
// this should be in .env file
app.use((0, log_sential_agent_1.logsential)({
    projectId: "f292e39a-7730-4f4a-89df-1ff24ac90d8d",
    apiKey: "240adf340b3f0b68d730ffd3c1339463",
    collectorUrl: "http://localhost:4000"
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: allowedUrl,
    credentials: true
}));
console.log(process.env.FRONTEND_URL);
app.use('/api/auth', auth_route_1.default);
app.use('/api/post', post_route_1.default);
app.use('/api/user', user_route_1.default);
app.use('/api/comment', comment_route_1.default);
app.use('/api/project', project_route_1.default);
app.use('/api/explore', explore_route_1.default);
app.use('/api/ai', ai_route_1.default);
const users = new Map();
io.on("connection", (socket) => {
    console.log("A user is connected: ", socket.id);
    socket.on("register", (userId) => {
        users.set(userId, socket.id);
    });
    socket.on("private-chat", ({ senderId, receiverId, message }) => {
        const targetedUser = users.get(receiverId);
        if (targetedUser) {
            io.to(targetedUser).emit("private-chat", { senderId, message });
        }
        else {
            console.log("User is offline");
        }
        // socket.emit("private-chat", { receiverId, message })
    });
    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
        for (const [userId, socketId] of users.entries()) {
            if (socketId === socket.id)
                users.delete(userId);
        }
    });
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, dbConnection_1.default)();
        server.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });
    });
}
main();
