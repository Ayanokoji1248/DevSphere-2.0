import { Request, Response } from "express"
import { ai } from "../config/googleGeminiConnection"

const userCodeContext: Record<string, string> = {}

export const reviewCode = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id as string;

        const { code } = req.body

        userCodeContext[userId] = code


        if (!code || typeof code !== "string") {
            res.status(400).json({
                message: "Code is required and must be a string"
            })
            return
        }

        const review = await ai.models.generateContent({
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
        })

        if (!review) {
            res.status(400).json({
                message: "Error in Generating Review"
            })
        }

        res.status(200).json({
            review: review.candidates?.[0]?.content?.parts?.[0]?.text || "No review generated"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

export const askAboutCode = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id;
        const { question } = req.body;

        if (!question || typeof question !== "string") {
            res.status(400).json({
                message: "Question is required"
            })
            return
        }

        const codeContext = userCodeContext[userId as string];

        if (!codeContext) {
            res.status(400).json({
                message: "No Code Context found. Please Upload your code first"
            })
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

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.status(200).json({
            answer: response.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}