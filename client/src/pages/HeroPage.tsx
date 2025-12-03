import HeroNav from "../components/HeroPage/HeroNav";
import Hero from "../components/HeroPage/Hero";
import BentoFeatures from "../components/HeroPage/BentoFeatures";
import TrendingSection from "../components/HeroPage/TrendingSection";

import type { Post, User } from "../components/HeroPage/types"
import TopDevelopers from "../components/HeroPage/TopDevelopers";
import StatsSection from "../components/HeroPage/StatsSection";
import CallToAction from "../components/HeroPage/CallToAction";
import FAQ from "../components/HeroPage/FAQ";
import Footer from "../components/HeroPage/Footer";

const CURRENT_USER: User = {
    name: 'Alex Chen',
    handle: '@alx_codes',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    bio: 'Full Stack Engineer building accessible web apps.',
    followers: 1240,
    following: 350,
    projects: 12
};

const SAMPLE_POSTS: Post[] = [
    {
        id: '1',
        user: CURRENT_USER,
        content: 'Just shipped the new dashboard for my SaaS project! 🚀 It uses Recharts for data visualization and Tailwind for styling. Check out the clean dark mode.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        likes: 45,
        comments: 12,
        shares: 5,
        timestamp: '2h',
        isProjectShowcase: true,
        tags: ['webdev', 'react', 'dashboard']
    },
    {
        id: '2',
        user: {
            name: 'Sarah Drasner',
            handle: '@sarah_d',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            bio: 'Engineering Manager',
            followers: 5000,
            following: 100,
            projects: 5
        },
        content: 'Does anyone else struggle with complex grid layouts in CSS? I found this neat trick using subgrid.',
        codeSnippet: {
            language: 'css',
            code: `.container {
display: grid;
grid-template-columns: 1fr 2fr 1fr;
grid-template-rows: subgrid;
}`
        },
        likes: 120,
        comments: 34,
        shares: 28,
        timestamp: '4h',
        tags: ['css', 'tips']
    },
    {
        id: '3',
        user: {
            name: 'David Miller',
            handle: '@davidm_rs',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            bio: 'Rust Enthusiast',
            followers: 800,
            following: 200,
            projects: 8
        },
        content: 'Refactoring my old Python backend to Rust using Actix Web. The performance gains are insane. Benchmarks coming soon!',
        projectLink: {
            title: 'backend-rewrite-rust',
            url: 'https://github.com/davidm/backend'
        },
        likes: 89,
        comments: 15,
        shares: 10,
        timestamp: '6h',
        tags: ['rust', 'performance', 'backend']
    }
];
const HeroPage = () => {

    const scrollToCTA = () => {
        const ctaSection = document.getElementById('cta');
        ctaSection?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="min-h-screen bg-background text-gray-100 selection:bg-primary/30 selection:text-white">
            <HeroNav />

            <main>
                <Hero
                    onGetStarted={scrollToCTA}
                />
                <BentoFeatures />
                <TrendingSection posts={SAMPLE_POSTS} onExplore={scrollToCTA} />
                <TopDevelopers />
                <StatsSection />
                <div id="cta">
                    <CallToAction onJoin={scrollToCTA} />
                </div>
                <FAQ />
            </main>
            <Footer />

        </div>
    );
};

export default HeroPage;
