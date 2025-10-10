import { Outlet } from "react-router-dom";
import { CodeXml, Globe, Star, Users, Zap } from 'lucide-react';
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
    return (
        <div className="auth-layout w-full min-h-screen bg-zinc-950 text-white flex font-[Satoshi] flex-col lg:flex-row">
            <Toaster />
            <div className="w-full min-h-screen bg-[linear-gradient(-20deg,#b721ff_0%,#21d4fd_100%)] lg:w-[50%] p-12 px-5 sm:px-15 flex flex-col lg:px-12 xl:px-20">
                <div className="flex items-center gap-3">
                    <Globe size={65} className="text-white" />
                    <div>
                        <h1 className="text-white font-bold font-[Albert_Sans] text-3xl">DevSphere</h1>
                        <p className="text-sm text-zinc-100 font-medium">Connect • Code • Create</p>
                    </div>
                </div>
                <div className="sm:w-108 flex flex-col sm:gap-6 gap-5 mt-8">
                    <h1 className="sm:text-6xl text-5xl font-bold tracking-tighter font-[Albert_Sans] text-white">
                        Join the future of <span className="text-yellow-400">developer collaboration</span>
                    </h1>
                    <p className="text-white font-medium font-[Albert_Sans] text-xl tracking-tighter leading-tight">
                        Share your projects, learn from others, and build amazing things together. Join thousands of passionate developers already making connections.
                    </p>
                </div>

                <div className="flex flex-col gap-5 sm:mt-10 mt-6">
                    <Feature icon={<CodeXml size={22} />} text="Share your coding journey" />
                    <Feature icon={<Users size={22} />} text="Connect with like-minded developers" />
                    <Feature icon={<Star size={22} />} text="Showcase your best projects" />
                    <Feature icon={<Zap size={22} />} text="Learn from experienced developers" />
                </div>
            </div>

            <div className="w-full lg:w-[50%] min-h-screen">
                <Outlet />
            </div>

        </div>
    );
};

const Feature = ({ icon, text }: { icon: ReactNode; text: string }) => (
    <div className="flex items-center gap-2">
        <div className="p-1.5 bg-zinc-100/30 shadow w-fit rounded-md text-white">
            {icon}
        </div>
        <p className="text-white font-[Albert_Sans] font-medium">{text}</p>
    </div>
);
export default AuthLayout;
