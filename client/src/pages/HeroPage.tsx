import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1b1b1b] text-white flex flex-col items-center justify-center px-6 text-center">
            {/* Glow background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[120px] top-32 left-1/4 animate-pulse"></div>
                <div className="absolute w-[400px] h-[400px] bg-blue-700/20 rounded-full blur-[120px] bottom-24 right-1/4 animate-pulse"></div>
            </div>

            {/* Main content */}
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
                Welcome to <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">DevSphere</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-2xl text-zinc-400 text-lg md:text-xl mb-10"
            >
                Connect, collaborate, and grow with developers around the globe.
                Your hub for projects, posts, and everything dev.
            </motion.p>

            {/* Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
                Get Started <ArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-10 text-zinc-500 text-sm"
            >
                Crafted for developers. Built with passion 💻
            </motion.p>
        </div>
    );
};

export default HeroPage;
