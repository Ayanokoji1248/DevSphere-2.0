import { Code, Image, Link } from "lucide-react";
import PostCard from "../components/PostCard";

const HomePage = () => {
    return (
        <div className="">
            {/* Create Post */}
            <div className="flex flex-col gap-5 p-8 w-full">
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
                            <div className="flex-1 border border-zinc-600 rounded-md p-1 hover:bg-blue-700 transition cursor-pointer flex justify-center items-center gap-2">
                                <Link size={18} />
                                <span className="text-sm font-medium">Link</span>
                            </div>
                            <div className="flex-1 border border-zinc-600 rounded-md p-1 hover:bg-blue-700 transition cursor-pointer flex justify-center items-center gap-2">
                                <Image size={18} />
                                <span className="text-sm font-medium">Media</span>
                            </div>
                            <div className="flex-1 border border-zinc-600 rounded-md p-1 hover:bg-blue-700 transition cursor-pointer flex justify-center items-center gap-2">
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
            <div className="mt-3 flex flex-col">
                <PostCard />
                <PostCard />
            </div>
        </div>
    );
};

export default HomePage;
