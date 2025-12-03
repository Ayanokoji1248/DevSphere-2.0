import React from 'react';

const StatsSection: React.FC = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-y border-white/5 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <div className="py-4 md:py-0">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">10,000+</div>
                        <div className="text-primary font-medium uppercase tracking-widest text-sm">Developers Onboard</div>
                    </div>
                    <div className="py-4 md:py-0">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                        <div className="text-secondary font-medium uppercase tracking-widest text-sm">Posts Shared Daily</div>
                    </div>
                    <div className="py-4 md:py-0">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
                        <div className="text-accent font-medium uppercase tracking-widest text-sm">Active Discussions</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;