import React from 'react';
import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-surface border-t border-white/10 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <Terminal className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-bold text-lg text-white">DevSphere</span>
                    </div>

                    <div className="flex gap-8 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                    </div>

                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} DevSphere Inc.
                    </div>
                </div>

                {/* Final CTA Strip */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-4 text-sm uppercase tracking-wider">Ready to deploy?</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Join the community today.
                    </h2>
                    <Link to={'/register'} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                        Get Started for Free
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;