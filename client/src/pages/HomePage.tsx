import { Code, Image, Link } from "lucide-react";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";

const HomePage = () => {
    return (
        <div className="bg-zinc-950 ">
            <div className="w-full min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row max-w-7xl mx-auto relative">
                {/* Sidebar */}
                <Sidebar />

                {/* Middle Section */}
                <div className="w-full md:w-[50%] min-h-[calc(100vh-80px)] md:min-h-screen p-4 md:p-8 mx-auto">

                    {/* Create Post */}
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                            {/* Profile */}
                            <img
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                src="https://i.pinimg.com/1200x/00/80/fc/0080fcbb036ac608f882c656509ea355.jpg"
                                alt=""
                            />

                            {/* Textarea + Actions */}
                            <div className="flex-1 flex flex-col gap-2">
                                <textarea
                                    className="w-full h-24 resize-none outline-none p-3 border border-zinc-600 rounded-md bg-zinc-950 text-sm font-medium placeholder:text-zinc-500"
                                    name="feed"
                                    id="feed"
                                    placeholder="Share your latest project, code snippet, or developer insight..."
                                />

                                <div className="flex flex-col sm:flex-row items-stretch gap-2 mt-2">
                                    <div className="flex-1 border border-zinc-600 rounded-md p-2 hover:bg-blue-700 transition cursor-pointer flex justify-center items-center gap-2">
                                        <Link size={18} />
                                        <span className="text-sm font-medium">Link</span>
                                    </div>
                                    <div className="flex-1 border border-zinc-600 rounded-md p-2 hover:bg-blue-700 transition cursor-pointer flex justify-center items-center gap-2">
                                        <Image size={18} />
                                        <span className="text-sm font-medium">Media</span>
                                    </div>
                                    <div className="flex-1 border border-zinc-600 rounded-md p-2 hover:bg-blue-700 transition cursor-pointer flex justify-center items-center gap-2">
                                        <Code size={18} />
                                        <span className="text-sm font-medium">Code</span>
                                    </div>
                                    <button disabled={true} className="disabled:bg-violet-700/70 disabled:cursor-default flex-1 p-3 bg-violet-600 rounded-md font-medium hover:bg-violet-700 transition cursor-pointer">
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Posts */}
                    <div className="mt-8 flex flex-col gap-6">
                        <PostCard />
                        <PostCard />
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="hidden md:flex justify-center items-start p-6 w-[30%] h-screen border-l  border-zinc-600 sticky top-0">
                    <div className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 flex flex-col gap-4">
                        {/* Profile */}
                        <div className="flex flex-col items-center gap-2 mb-2">
                            <img
                                src="https://i.pinimg.com/1200x/00/80/fc/0080fcbb036ac608f882c656509ea355.jpg"
                                alt="profile"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <h2 className="text-white font-semibold text-lg">Krish Prajapati</h2>
                            <p className="text-sm leading-1 text-zinc-400">@crish1248</p>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-around text-center border-t border-b border-zinc-700 py-3">
                            <div>
                                <p className="text-white font-medium">120</p>
                                <p className="text-sm text-zinc-400">Followers</p>
                            </div>
                            <div>
                                <p className="text-white font-medium">80</p>
                                <p className="text-sm text-zinc-400">Following</p>
                            </div>
                            <div>
                                <p className="text-white font-medium">34</p>
                                <p className="text-sm text-zinc-400">Posts</p>
                            </div>
                            <div>
                                <p className="text-white font-medium">12</p>
                                <p className="text-sm text-zinc-400">Projects</p>
                            </div>
                        </div>

                        {/* Optional Action */}
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md font-medium cursor-pointer">
                            View Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
