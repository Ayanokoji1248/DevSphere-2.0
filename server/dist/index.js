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
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use('/api/auth', auth_route_1.default);
app.use('/api/post', post_route_1.default);
app.use('/api/user', user_route_1.default);
app.use('/api/comment', comment_route_1.default);
app.use('/api/project', project_route_1.default);
app.use('/api/explore', explore_route_1.default);
app.use('/api/ai', ai_route_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, dbConnection_1.default)();
        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });
    });
}
main();
