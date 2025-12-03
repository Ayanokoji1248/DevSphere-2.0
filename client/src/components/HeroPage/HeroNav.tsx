import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                            <div className="bg-primary/20 p-2 rounded-lg">
                                <Globe className="h-6 w-6 text-primary" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">DevSphere</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
                                <a href="#faq" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">FAQ</a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link to={'/register'} className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105">
                            Get Started
                        </Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-surface border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
                        <a href="#faq" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">FAQ</a>
                        <button className="w-full text-center mt-4 bg-primary text-white px-4 py-2 rounded-md text-base font-medium">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default HeroNav;