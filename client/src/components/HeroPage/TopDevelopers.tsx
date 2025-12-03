import React from 'react';
import { Plus } from 'lucide-react';

const TOP_DEVS = [
    { name: "Sarah", role: "Frontend", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80", x: "10%", y: "20%" },
    { name: "Alex", role: "Fullstack", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80", x: "80%", y: "15%" },
    { name: "David", role: "Backend", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80", x: "20%", y: "70%" },
    { name: "Emily", role: "AI/ML", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80", x: "70%", y: "65%" },
];

const TopDevelopers: React.FC = () => {
    return (
        <section className="py-24 bg-black relative min-h-[600px] overflow-hidden flex flex-col items-center justify-center">
            {/* Background radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black"></div>

            <div className="relative z-10 text-center mb-8 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join 10,000+ Top Developers</h2>
                <p className="text-gray-400">Find your tribe. Build together.</p>
            </div>

            {/* Mobile Grid */}
            <div className="md:hidden grid grid-cols-2 gap-4 px-4 relative z-10 w-full">
                {TOP_DEVS.slice(0, 4).map((dev, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center">
                        <img src={dev.img} alt={dev.name} className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-primary/50" />
                        <h3 className="text-white font-bold">{dev.name}</h3>
                        <p className="text-xs text-gray-500">{dev.role}</p>
                    </div>
                ))}
            </div>

            {/* Desktop Scattered Layout */}
            <div className="hidden md:block absolute inset-0 w-full h-full max-w-6xl mx-auto pointer-events-none">
                {TOP_DEVS.map((dev, i) => (
                    <div
                        key={i}
                        className="absolute pointer-events-auto hover:z-50 transition-all duration-300 hover:scale-110"
                        style={{
                            top: dev.y,
                            left: dev.x,
                            animation: `float ${6 + i}s ease-in-out infinite ${i * 0.5}s`
                        }}
                    >
                        <div className="relative group">
                            {/* Card */}
                            <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full pr-6 pl-2 py-2 shadow-2xl group-hover:border-primary/50 transition-colors">
                                <div className="relative">
                                    <img src={dev.img} alt={dev.name} className="w-12 h-12 rounded-full object-cover border border-white/20" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border border-black rounded-full"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-bold text-sm">{dev.name}</span>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{dev.role}</span>
                                </div>
                            </div>

                            {/* Hover Connect Button */}
                            <button className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopDevelopers;