import { useState } from "react";
import { CodeXml, Link, MapPin, Plus } from "lucide-react";
import EditProfileModal from "../components/EditProfileModal";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("Posts");

    // Mock user data
    const user = {
        fullName: "Krish Prajapati",
        username: "crish1248",
        headline: "Full Stack Developer",
        bio: "Building beautiful web apps and exploring creative tech 🌐✨",
        address: "Ahmedabad, India",
        portfolioLink: "https://krishdevs.vercel.app",
        followerCount: 145,
        followingCount: 89,
        projects: [
            { name: "Nomad Navigator" },
            { name: "SQLify" },
            { name: "DevLink" },
        ],
        posts: [
            { content: "Just deployed my new project 🚀 #React #MERN" },
            { content: "Experimenting with Zustand and Zustand Persist 🔥" },
        ],
        skills: ["React", "Node.js", "Express", "MongoDB", "TypeScript"],
        profileImg:
            "https://i.pinimg.com/1200x/00/80/fc/0080fcbb036ac608f882c656509ea355.jpg",
        bannerImg:
            "https://i.pinimg.com/736x/e4/09/bf/e409bf64dc35dfedac8feb356f9124a5.jpg",
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-[Albert_Sans]">

            {/* <div className="absolute z-10 w-full h-screen bg-blue-500">
            </div> */}
                <EditProfileModal />
            {/* <div className="absolute">
            </div> */}

            {/* Cover */}
            <div className="h-48 md:h-64 w-full relative">
                <img
                    src={user.bannerImg}
                    alt="cover"
                    className="w-full h-full object-cover"
                />
                {/* Profile Image */}
                <div className="absolute bottom-[-50px] left-6 w-28 h-28 md:w-32 md:h-32 border-4 border-zinc-950 rounded-full overflow-hidden">
                    <img
                        src={user.profileImg}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="px-8 mt-16 md:mt-15">
                {/* Name + Headline */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            {user.fullName}
                        </h1>
                        <p className="text-zinc-500 text-sm">@{user.username}</p>
                    </div>

                    <button className="bg-black hover:bg-zinc-900 border border-zinc-600 px-4 py-2 rounded-full text-sm font-medium transition duration-300 cursor-pointer">
                        Edit Profile
                    </button>
                </div>

                {/* Headline */}
                <p className="mt-2 bg-violet-900/40 px-2 py-1 rounded-full text-xs w-fit text-violet-300 font-medium">
                    {user.headline}
                </p>

                {/* Bio */}
                <p className="mt-3 text-sm text-zinc-300 leading-tight">{user.bio}</p>

                {/* Location + Portfolio */}
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-blue-400" />
                        <span>{user.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link size={16} className="text-emerald-400" />
                        <a
                            href={user.portfolioLink}
                            className="text-blue-400 hover:underline break-all"
                            target="_blank"
                        >
                            {user.portfolioLink}
                        </a>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-around mt-5 border-t border-b border-zinc-800 py-3">
                    <div className="text-center">
                        <h2 className="font-bold text-xl">{user.followingCount}</h2>
                        <p className="text-sm text-zinc-400">Following</p>
                    </div>
                    <div className="text-center">
                        <h2 className="font-bold text-xl">{user.followerCount}</h2>
                        <p className="text-sm text-zinc-400">Followers</p>
                    </div>
                    <div className="text-center">
                        <h2 className="font-bold text-xl">{user.posts.length}</h2>
                        <p className="text-sm text-zinc-400">Posts</p>
                    </div>
                    <div className="text-center">
                        <h2 className="font-bold text-xl">{user.projects.length}</h2>
                        <p className="text-sm text-zinc-400">Projects</p>
                    </div>
                </div>

                {/* Skills */}
                <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <CodeXml className="text-blue-400" size={20} />
                            <h2 className="font-semibold text-lg">Skills & Technologies</h2>
                        </div>
                        <button className="flex items-center gap-2 text-sm font-medium border border-zinc-700 px-2 py-1 rounded-md hover:bg-zinc-800 transition">
                            <Plus size={16} /> Add Skill
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-900/60 text-blue-400 text-sm rounded-full font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-evenly mt-6 border-b border-zinc-800">
                    {["Posts", "Projects"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 p-2 font-medium text-sm ${activeTab === tab
                                ? "border-b-2 border-violet-500 text-white"
                                : "text-zinc-400 hover:text-white"
                                } transition`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-5 pb-5 flex flex-col gap-4">
                    {activeTab === "Posts" &&
                        user.posts.map((post, idx) => (
                            <div
                                key={idx}
                                className="border border-zinc-800 rounded-lg p-3 bg-zinc-900/60"
                            >
                                <p className="text-sm text-zinc-200">{post.content}</p>
                            </div>
                        ))}

                    {activeTab === "Projects" &&
                        user.projects.map((project, idx) => (
                            <div
                                key={idx}
                                className="border border-zinc-800 rounded-lg p-3 bg-zinc-900/60"
                            >
                                <h3 className="text-base font-medium">{project.name}</h3>
                            </div>
                        ))}
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;
