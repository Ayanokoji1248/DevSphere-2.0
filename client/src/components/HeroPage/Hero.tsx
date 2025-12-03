import React from 'react';
import { ArrowRight, Code2, Globe, Rocket, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
    onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
    return (
        <div className="relative overflow-hidden pt-32 pb-16 lg:pb-32 lg:pt-48 bg-background min-h-[85vh] flex flex-col justify-center">

            {/* --- Background Illustrations --- */}

            {/* 1. Enhanced Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808024_1px,transparent_1px),linear-gradient(to_bottom,#80808024_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>

            {/* 2. Central Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 rounded-full blur-[60px] md:blur-[100px] -z-10 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-secondary/10 rounded-full blur-[50px] md:blur-[80px] -z-10 opacity-30"></div>

            {/* 3. Floating Top Left Illustration (IDE Window) */}
            <div className="absolute top-10 -left-6 sm:top-16 sm:left-6 lg:top-24 lg:left-16 w-64 sm:w-72 lg:w-80 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl block animate-float -rotate-3 z-0 overflow-hidden opacity-40 sm:opacity-70 xl:opacity-100 pointer-events-none xl:pointer-events-auto transition-opacity duration-500 backdrop-blur-sm">
                {/* Window Controls */}
                <div className="bg-white/5 px-4 py-3 flex gap-2 border-b border-white/5 items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <div className="ml-auto text-[10px] text-gray-500 font-mono">devsphere.tsx</div>
                </div>

                {/* Code Content */}
                <div className="p-5 space-y-2 font-mono text-xs text-gray-400 leading-relaxed">
                    <div className="flex gap-2">
                        <span className="text-secondary">import</span>
                        <span className="text-white">Future</span>
                        <span className="text-secondary">from</span>
                        <span className="text-green-400">'@devsphere/core'</span>;
                    </div>
                    <div className="h-2"></div>
                    <div className="flex gap-2">
                        <span className="text-secondary">const</span>
                        <span className="text-blue-400">buildDream</span>
                        <span className="text-white">=</span>
                        <span className="text-yellow-400">async</span>
                        <span className="text-yellow-400">()</span>
                        <span className="text-secondary">=&gt;</span>
                        <span className="text-yellow-400">{'{'}</span>
                    </div>
                    <div className="pl-4">
                        <span className="text-secondary">await</span> <span className="text-purple-400">connect</span>(<span className="text-white">developers</span>);
                    </div>
                    <div className="pl-4">
                        <span className="text-secondary">return</span> <span className="text-green-400">&lt;Innovation /&gt;</span>;
                    </div>
                    <div className="text-yellow-400">{'}'}</div>
                </div>

                {/* Badge */}
                <div className="absolute top-1/2 -right-4 bg-surface p-3 rounded-lg border border-white/10 shadow-xl transform translate-x-1/2 rotate-12">
                    <Code2 className="w-6 h-6 text-primary" />
                </div>
            </div>

            {/* 4. Floating Bottom Right Illustration (Deployment & Activity) */}
            <div className="absolute bottom-10 -right-6 sm:bottom-16 sm:right-6 lg:bottom-24 lg:right-16 w-72 h-72 flex flex-col items-center justify-center animate-float-delayed z-0 pointer-events-none scale-75 sm:scale-90 xl:scale-100 opacity-40 sm:opacity-70 xl:opacity-100 transition-all duration-500">

                {/* Back Layer: Terminal Log */}
                <div className="absolute -top-4 -left-4 w-64 bg-[#0f0f11] rounded-lg border border-white/5 p-4 transform -rotate-6 shadow-lg opacity-60 blur-[1px]">
                    <div className="space-y-2 font-mono text-[10px] text-gray-600">
                        <p>{">"} git push origin main</p>
                        <p className="text-blue-500/50">Compressing objects: 100%</p>
                        <p className="text-green-500/50">Writing objects: 100%</p>
                        <p>Total 24 (delta 12)</p>
                    </div>
                </div>

                {/* Middle Layer: Server Stats */}
                <div className="absolute top-8 -right-8 w-48 bg-[#121214] rounded-lg border border-white/10 p-3 transform rotate-12 shadow-xl z-10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-gray-400 flex items-center gap-1"><Server className="w-3 h-3" /> US-East</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    </div>
                    <div className="flex items-end gap-2">
                        <div className="h-8 w-2 bg-primary/20 rounded-sm"></div>
                        <div className="h-12 w-2 bg-primary/40 rounded-sm"></div>
                        <div className="h-6 w-2 bg-primary/20 rounded-sm"></div>
                        <div className="h-10 w-2 bg-primary/60 rounded-sm"></div>
                        <div className="h-14 w-2 bg-primary rounded-sm"></div>
                    </div>
                </div>

                {/* Front Layer: Deployment Success */}
                <div className="relative z-20 w-72 bg-[#121214] rounded-xl border border-white/10 p-5 shadow-2xl">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse absolute top-0 right-0"></div>
                                <Globe className="w-4 h-4 text-gray-300" />
                            </div>
                            <span className="text-xs font-bold text-white tracking-wide">PRODUCTION</span>
                        </div>
                        <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">Live</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center border border-primary/20">
                            <Rocket className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white">Deployment Successful</h3>
                            <p className="text-xs text-gray-500">v2.4.0 &bull; 12s ago</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                            <span>Building...</span>
                            <span className="text-green-500">Done</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-primary to-green-400 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-20"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 animate-fade-in backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                    The Social Network for Developers
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in leading-tight">
                    Connect, Build & Share <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary relative">
                        Your Developer Journey
                        <span className="absolute inset-0 bg-primary/20 blur-xl -z-10"></span>
                    </span>
                </h1>

                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 mb-10 animate-fade-in leading-relaxed">
                    Join a community of developers posting blogs, showcasing projects, and collaborating in real-time.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
                    <button
                        onClick={onGetStarted}
                        className="px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg shadow-primary/25 flex items-center gap-2 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative">Get Started</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative" />
                    </button>
                    <Link to={'/login'}
                        className="px-8 py-4 bg-surface hover:bg-zinc-800 text-white border border-white/10 rounded-lg font-bold text-lg transition-all flex items-center gap-2"
                    >
                        <Globe className="w-5 h-5 text-gray-400" />
                        Explore Posts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;