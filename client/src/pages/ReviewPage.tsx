import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import CodeReviewOutput from "../components/CodeReviewOutput";

const ReviewPage = () => {
    const [code, setCode] = useState("// Write or paste your code here...");
    const [language, setLanguage] = useState("javascript");
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const [followUp, setFollowUp] = useState("");
    // const [followUpResponse, setFollowUpResponse] = useState("");
    // const [followUpLoading, setFollowUpLoading] = useState(false);

    const handleReview = async () => {
        if (!code.trim()) {
            setError("Please write or paste some code first.");
            return;
        }
        setError("");
        setReview("");
        // setFollowUp("");
        // setFollowUpResponse("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${BACKEND_URL}/ai/review`,
                { code, language },
                { withCredentials: true }
            );
            setReview(response.data.review);
        } catch (err) {
            console.log(err);
            setError("Failed to get review");
        } finally {
            setLoading(false);
        }
    };

    // const handleFollowUp = async () => {
    //     if (!followUp.trim()) return;
    //     setFollowUpResponse("");
    //     setFollowUpLoading(true);
    //     try {
    //         const response = await axios.post(
    //             `${BACKEND_URL}/ai/followUp`,
    //             { question: followUp },
    //             { withCredentials: true }
    //         );
    //         setFollowUpResponse(response.data.answer);
    //     } catch (err) {
    //         console.log(err);
    //         setFollowUpResponse("Failed to get follow-up response.");
    //     } finally {
    //         setFollowUpLoading(false);
    //     }
    // };

    return (
        <div className="min-h-screen bg-zinc-950 text-gray-100 flex justify-center px-8 py-5">
            <div className="w-full max-w-6xl flex flex-col gap-6">
                {/* Header */}
                <header className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        AI Code Reviewer
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Write your code below and let AI review it for you
                    </p>
                </header>

                {/* Language Selector */}
                <div className="flex gap-3 items-center mb-2">
                    <h1 className="text-xl font-medium ">Select Your Language:</h1>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-zinc-900 text-white p-2 rounded-md"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="csharp">C#</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                    </select>
                </div>

                {/* Code Editor */}
                <section className="border border-zinc-700 rounded-xl overflow-hidden">
                    <Editor
                        height="350px"
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        options={{
                            fontSize: 16,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </section>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4 mt-4 items-start md:items-center">
                    <button
                        onClick={handleReview}
                        disabled={loading}
                        className={`flex justify-center items-center px-6 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all ${loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                Reviewing...
                            </span>
                        ) : (
                            "Review Code"
                        )}
                    </button>
                    {error && (
                        <p className="text-red-400 text-sm mt-2 md:mt-0 md:ml-4">
                            {error}
                        </p>
                    )}
                </div>

                {/* Side-by-Side Layout */}
                {review && (
                    <div className="w-full">
                        {/* Left: Review Output */}
                        <div className="border border-zinc-700 rounded-xl overflow-y-auto max-h-[700px] bg-zinc-900 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
                            <CodeReviewOutput review={review} />
                        </div>

                        {/* Right: Follow-up Section */}
                        {/* <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-semibold mb-3">Ask a follow-up question</h2>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        value={followUp}
                                        onChange={(e) => setFollowUp(e.target.value)}
                                        placeholder="e.g., Explain this issue more clearly..."
                                        className="bg-zinc-800 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                    <button
                                        onClick={handleFollowUp}
                                        disabled={followUpLoading}
                                        className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${followUpLoading
                                            ? "bg-blue-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                                            }`}
                                    >
                                        {followUpLoading ? "Asking..." : "Ask"}
                                    </button>
                                </div>
                            </div>

                            {followUpResponse && (
                                <div className="mt-5 bg-zinc-800 border border-zinc-700 rounded-md p-3 text-sm text-gray-300 overflow-y-auto max-h-[400px]">
                                    {followUpResponse}
                                </div>
                            )}
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewPage;
