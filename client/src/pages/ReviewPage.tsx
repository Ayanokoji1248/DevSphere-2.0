import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import CodeReviewOutput from "../components/CodeReviewOutput";

const ReviewPage = () => {
    const [code, setCode] = useState("// Write or paste your code here...");
    const [language, setLanguage] = useState("javascript"); // New state for language
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleReview = async () => {
        if (!code.trim()) {
            setError("Please write or paste some code first.");
            return;
        }
        setError("");
        setReview("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${BACKEND_URL}/ai/review`,
                { code, language }, // send language too
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

    return (
        <div className="min-h-screen bg-zinc-950 text-gray-100 flex justify-center px-4 py-5">
            <div className="w-full max-w-4xl flex flex-col gap-6">
                {/* Header */}
                <header className=" text-center md:text-left">
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
                        language={language} // dynamic language
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
                <div className="flex flex-col md:flex-row gap-4 mt-4">
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

                {/* Review Output */}
                {review && <CodeReviewOutput review={review} />}
            </div>
        </div>
    );
};

export default ReviewPage;
