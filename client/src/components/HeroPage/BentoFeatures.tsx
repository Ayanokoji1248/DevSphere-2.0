import React from 'react';
import { Bot, Layers, Globe, Code2, Github, ExternalLink, AlertTriangle, Zap } from 'lucide-react';

const BentoFeatures: React.FC = () => {
    return (
        <section id="features" className="py-24 bg-background relative overflow-hidden">
            {/* Background Blurs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Everything you need to <span className="text-primary">Ship</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Showcase your work, get AI-powered feedback, and connect with the best.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* 1. AI Code Reviewer (Large - Col Span 2) */}
                    {/* CHANGED: Switched to flex-col md:flex-row to separate text and image */}
                    <div className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121214] transition-colors hover:border-primary/50 flex flex-col md:flex-row min-h-[340px]">

                        {/* Content Side (Left) */}
                        <div className="relative z-10 flex flex-col justify-center p-8 md:w-1/2 pointer-events-none">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                                <Bot className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">AI Code Reviewer</h3>
                            <p className="mt-4 text-gray-400 leading-relaxed text-sm lg:text-base">
                                Submit your code and get a comprehensive analysis report. Detect bugs, security vulnerabilities, and performance bottlenecks in seconds.
                            </p>
                        </div>

                        {/* Illustration Side (Right) */}
                        <div className="relative w-full md:w-1/2 min-h-[250px] md:min-h-full bg-gradient-to-br from-white/5 to-transparent border-t md:border-t-0 md:border-l border-white/5 overflow-hidden flex items-center justify-center">

                            {/* Background Grid Pattern for Illustration Area */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>

                            {/* Floating Elements Container */}
                            <div className="relative w-full h-full flex items-center justify-center p-6 perspective-1000">

                                {/* Code Editor Underlay */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-[#0d1117] rounded-xl border border-white/10 p-3 opacity-40 blur-[1px] transform rotate-[-6deg] scale-90 transition-transform group-hover:rotate-[-8deg] group-hover:scale-95 duration-500">
                                    <div className="flex gap-1.5 mb-2">
                                        <div className="h-2 w-2 rounded-full bg-red-500/50" />
                                        <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                                        <div className="h-2 w-2 rounded-full bg-green-500/50" />
                                    </div>
                                    <div className="space-y-2 opacity-50">
                                        <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                                        <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                                        <div className="h-2 w-full bg-white/10 rounded-full"></div>
                                        <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Main Analysis Card */}
                                <div className="relative w-[260px] bg-[#1e1e24] border border-white/10 rounded-xl shadow-2xl p-4 animate-float z-10">
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 bg-primary/20 rounded">
                                                <Bot className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-xs font-bold text-white">Review Report</span>
                                        </div>
                                        <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20 font-medium">Passed</span>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Score */}
                                        <div>
                                            <div className="flex justify-between items-end mb-1">
                                                <span className="text-[10px] text-gray-400 font-medium">Quality Score</span>
                                                <span className="text-sm font-bold text-white">92<span className="text-gray-500 text-[10px]">/100</span></span>
                                            </div>
                                            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden border border-white/5">
                                                <div className="bg-gradient-to-r from-primary to-blue-400 h-full w-[92%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                                                    <span className="text-[9px] text-gray-400">Issues</span>
                                                </div>
                                                <span className="text-xs font-bold text-white pl-0.5">0 Critical</span>
                                            </div>
                                            <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <Zap className="w-3 h-3 text-blue-400" />
                                                    <span className="text-[9px] text-gray-400">Perf</span>
                                                </div>
                                                <span className="text-xs font-bold text-white pl-0.5">A+ Grade</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Project Showcase (Col Span 1) */}
                    <div className="md:col-span-1 group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121214] p-8 transition-colors hover:border-secondary/50 min-h-[320px]">
                        <div className="relative z-10 pointer-events-none mb-32">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                                <Layers className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Project Showcase</h3>
                            <p className="mt-2 text-sm text-gray-400">
                                Share your projects with rich details: Tech Stack, GitHub & Live Links.
                            </p>
                        </div>

                        {/* Illustration: Detailed Project Card */}
                        <div className="absolute bottom-4 left-4 right-4 bg-[#1c1c1f] rounded-xl border border-white/10 shadow-2xl overflow-hidden group-hover:-translate-y-2 transition-transform duration-300">
                            {/* Card Image */}
                            <div className="h-20 bg-gradient-to-br from-purple-900/40 to-black relative">
                                <div className="absolute bottom-2 left-3 w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center">
                                    <Layers className="w-4 h-4 text-secondary" />
                                </div>
                            </div>

                            {/* Card Details */}
                            <div className="p-3">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="h-3 w-24 bg-white/20 rounded-sm mb-1.5"></div>
                                    <div className="flex gap-1">
                                        <Github className="w-3 h-3 text-gray-500" />
                                        <ExternalLink className="w-3 h-3 text-gray-500" />
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-sm mb-1"></div>
                                <div className="h-1.5 w-2/3 bg-white/5 rounded-sm mb-3"></div>

                                {/* Tech Stack Badges */}
                                <div className="flex gap-1.5 flex-wrap">
                                    <div className="h-3 w-8 bg-blue-500/10 border border-blue-500/20 rounded-full"></div>
                                    <div className="h-3 w-10 bg-yellow-500/10 border border-yellow-500/20 rounded-full"></div>
                                    <div className="h-3 w-6 bg-green-500/10 border border-green-500/20 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Global Developer Network (Full Width) */}
                    <div className="md:col-span-3 group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121214] p-8 transition-colors hover:border-blue-500/50 min-h-[280px] flex flex-col md:flex-row items-center">

                        {/* TEXT SECTION */}
                        <div className="relative z-10 max-w-lg pointer-events-none order-1 md:order-none">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-blue-500">
                                <Globe className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Global Developer Network</h3>
                            <p className="mt-2 text-gray-400 text-lg">
                                Connect with developers from around the globe. Collaborate on open source, find mentors, and grow your career.
                            </p>
                        </div>

                        {/* ILLUSTRATION */}
                        <div className="relative w-full md:w-2/3 h-[280px] md:h-full mt-6 md:mt-0 order-2 md:order-none opacity-40 group-hover:opacity-60 transition-opacity">

                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                            <div className="relative h-full w-full flex items-center justify-center md:translate-x-20">

                                {/* Central Hub */}
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                                        <Code2 className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
                                </div>

                                {/* Orbiting Nodes */}
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                                    const rad = (deg * Math.PI) / 180;
                                    const x = Math.cos(rad) * 140;
                                    const y = Math.sin(rad) * 80;

                                    return (
                                        <div key={i} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
                                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] -z-10 pointer-events-none">
                                                <line
                                                    x1="150"
                                                    y1="150"
                                                    x2={150 - x}
                                                    y2={150 - y}
                                                    stroke="url(#gradient-line)"
                                                    strokeWidth="1"
                                                    className="opacity-30"
                                                />
                                                <defs>
                                                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                                                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>

                                            <div className="w-10 h-10 rounded-full bg-[#1c1c1f] border border-white/20 flex items-center justify-center hover:scale-110 transition-transform hover:border-blue-400 z-20 shadow-lg cursor-pointer group/node">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 50}`}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[8px] text-white opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                                    Dev {i + 1}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default BentoFeatures;