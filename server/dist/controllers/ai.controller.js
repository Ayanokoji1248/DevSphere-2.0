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
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAboutCode = exports.reviewCode = void 0;
const googleGeminiConnection_1 = require("../config/googleGeminiConnection");
const userCodeContext = {};
const reviewCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const userId = req.user.id;
        const { code } = req.body;
        userCodeContext[userId] = code;
        if (!code || typeof code !== "string") {
            res.status(400).json({
                message: "Code is required and must be a string"
            });
            return;
        }
        const review = yield googleGeminiConnection_1.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: code,
            config: {
                systemInstruction: `
You are a professional AI code reviewer with expertise in multiple programming languages and frameworks.

Your responsibilities include:
- Providing a **clear, structured, and detailed** review of the provided code.
- Highlighting the code’s strengths, such as readability, modularity, performance, and best practices.
- Identifying all potential issues or bugs, including logic errors, anti-patterns, poor naming, or inefficient code.
- Suggesting **specific and correct code improvements** with explanations.
- Formatting all feedback using proper Markdown, including headings, bullet points, code blocks, and inline comments.

Your response format must be:

---
## ✅ Code Review Summary
_Brief summary (2–3 lines) about what the code does and overall assessment._

---
## 📋 Strengths
- ✅ [Point 1]
- ✅ [Point 2]

---
## ⚠️ Issues Found
- ❌ [Issue description]  
  💡 **Fix**: [Corrected version or suggestion]

---
## 🛠️ Suggested Code Improvements
\`\`\`[language]
// Improved or corrected version of the code
\`\`\`
`
            }
        });
        if (!review) {
            res.status(400).json({
                message: "Error in Generating Review"
            });
        }
        res.status(200).json({
            review: ((_e = (_d = (_c = (_b = (_a = review.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) || "No review generated"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.reviewCode = reviewCode;
const askAboutCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const userId = req.user.id;
        const { question } = req.body;
        if (!question || typeof question !== "string") {
            res.status(400).json({
                message: "Question is required"
            });
            return;
        }
        const codeContext = userCodeContext[userId];
        if (!codeContext) {
            res.status(400).json({
                message: "No Code Context found. Please Upload your code first"
            });
        }
        const prompt = `
The user previously shared the following code:
---
${codeContext}
---

Now the user is asking this question:
"${question}"

Respond based on the provided code. Be specific and technical.
Format your answer using Markdown, with examples and explanations where appropriate.
    `;
        const response = yield googleGeminiConnection_1.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        res.status(200).json({
            answer: ((_e = (_d = (_c = (_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) || "No response generated",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.askAboutCode = askAboutCode;
