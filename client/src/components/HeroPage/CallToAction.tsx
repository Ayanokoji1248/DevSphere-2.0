import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CallToActionProps {
    onJoin: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onJoin }) => {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    Ready to build your <br />
                    <span className="text-primary">developer presence?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    Join thousands of developers sharing their journey, getting feedback, and growing together.
                </p>
                <Link to={'/register'}
                    onClick={onJoin}
                    className="w-fit px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 mx-auto"
                >
                    Join DevSphere Today <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="mt-4 text-sm text-gray-500">Free to join. No credit card required.</p>
            </div>
        </section>
    );
};

export default CallToAction;