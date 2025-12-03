import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { FAQItem } from './types';

const faqData: FAQItem[] = [
    {
        question: "Is DevSphere free to use?",
        answer: "Yes, DevSphere is completely free for personal use. We offer premium tiers for organizations that need private repositories and advanced team collaboration features."
    },
    {
        question: "How does the AI Code Review work?",
        answer: "We utilize Google's advanced Gemini models to analyze your code snippets in real-time. It checks for syntax errors, logical bugs, and suggests performance optimizations."
    },
    {
        question: "What languages are supported?",
        answer: "DevSphere supports syntax highlighting and AI review for over 50+ programming languages, including JavaScript, Python, Rust, Go, C++, and more."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-background">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-400">Common questions about the platform.</p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-lg bg-surface/30 overflow-hidden transition-all duration-200"
                        >
                            <button
                                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-white font-medium">{item.question}</span>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                ) : (
                                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-4 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 mt-2">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;