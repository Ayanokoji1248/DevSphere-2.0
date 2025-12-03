import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import type { Post } from './types';

interface TrendingSectionProps {
    posts: Post[];
    onExplore: () => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ posts, onExplore }) => {
    // We need enough duplicates to ensure one "track" fills the screen width.
    // With 3 sample posts, 2x duplication (6 posts) is ~2100px, which covers most screens.
    const trackPosts = [...posts, ...posts];

    const TrendingCard = ({ post, idx }: { post: Post; idx: number }) => (
        <div
            key={idx}
            className="w-[350px] bg-[#121214] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group flex-shrink-0"
        >
            <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                    <img src={post.user.avatar} alt={post.user.name} className="w-8 h-8 rounded-full border border-white/10" />
                    <div>
                        <h4 className="text-white font-bold text-sm">{post.user.name}</h4>
                        <span className="text-gray-500 text-xs">{post.user.handle}</span>
                    </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.content}
                </p>

                {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">#{tag}</span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-gray-500 text-xs">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 group-hover:text-pink-500 transition-colors">
                            <Heart className="w-3 h-3" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-3 h-3" /> {post.comments}
                        </span>
                    </div>
                    <span className="text-gray-600">{post.timestamp} ago</span>
                </div>
            </div>
        </div>
    );

    return (
        <section id="trending" className="py-24 bg-surface/30 border-y border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-red-400 text-sm font-mono uppercase tracking-widest">Live Feed</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Trending on DevSphere</h2>
                </div>
                <button
                    onClick={onExplore}
                    className="hidden md:flex text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-colors"
                >
                    View All Posts
                </button>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full group">
                {/* Blur Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

                {/* Dual Track Marquee for Seamless Loop */}
                <div className="flex overflow-hidden">
                    {/* Track 1 */}
                    <div className="flex gap-6 animate-marquee flex-shrink-0 items-center pr-6">
                        {trackPosts.map((post, idx) => (
                            <TrendingCard key={`t1-${idx}`} post={post} idx={idx} />
                        ))}
                    </div>
                    {/* Track 2 (Duplicate) */}
                    <div className="flex gap-6 animate-marquee flex-shrink-0 items-center pr-6" aria-hidden="true">
                        {trackPosts.map((post, idx) => (
                            <TrendingCard key={`t2-${idx}`} post={post} idx={idx} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center md:hidden">
                <button
                    onClick={onExplore}
                    className="text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full transition-colors"
                >
                    View All Posts
                </button>
            </div>
        </section>
    );
};

export default TrendingSection;