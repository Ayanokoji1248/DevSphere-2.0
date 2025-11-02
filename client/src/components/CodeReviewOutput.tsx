import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import py from "react-syntax-highlighter/dist/esm/languages/prism/python";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FileText } from "lucide-react";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("python", py);

interface CodeReviewProps {
    review: string;
}

const CodeReviewOutput = ({ review }: CodeReviewProps) => {
    return (
        <div className="w-full bg-[#0d0d0f] border border-[#1e1e20] rounded-2xl shadow-2xl p-6 md:p-8 text-gray-100 transition-all duration-300 hover:shadow-blue-900/30">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 md:mb-6 border-b border-gray-800 pb-3 md:pb-4">
                <FileText className="text-blue-500" size={22} />
                <h2 className="text-xl md:text-2xl font-semibold tracking-wide">
                    AI Code Review Report
                </h2>
            </div>

            {/* Markdown Renderer */}
            <div className="prose prose-invert max-w-full break-words prose-headings:text-gray-100 prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-blue-400 prose-code:text-blue-400">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h2: ({ ...props }) => (
                            <h2
                                className="text-lg md:text-xl text-blue-400 font-semibold mt-4 mb-2 border-l-4 border-blue-500 pl-2 md:pl-3"
                                {...props}
                            />
                        ),
                        h3: ({ ...props }) => (
                            <h3
                                className="text-base md:text-lg text-blue-300 font-medium mt-3 mb-2 border-l-2 border-blue-400 pl-2"
                                {...props}
                            />
                        ),
                        p: ({ ...props }) => (
                            <p className="leading-relaxed mb-2 md:mb-3 text-gray-300" {...props} />
                        ),
                        li: ({ ...props }) => <li className="mb-1 md:mb-2 text-gray-300" {...props} />,
                        code({ className, children }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return match ? (
                                <SyntaxHighlighter
                                    PreTag="div"
                                    language={match[1]}
                                    style={dracula}
                                    customStyle={{
                                        borderRadius: 12,
                                        fontSize: "0.9rem",
                                        backgroundColor: "#1a1a1d",
                                        padding: "0.9rem",
                                        border: "1px solid #2b2b2e",
                                        overflowX: "auto",
                                    }}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className="bg-[#1a1a1d] text-blue-400 px-1.5 py-0.5 rounded-md text-sm font-mono border border-gray-800 break-words">
                                    {children}
                                </code>
                            );
                        },
                        hr: () => <hr className="my-4 md:my-6 border-gray-800" />,
                    }}
                >
                    {review}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default CodeReviewOutput;
