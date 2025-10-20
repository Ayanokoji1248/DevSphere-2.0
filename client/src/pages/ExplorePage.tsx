import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import PostCard from "../components/PostCard";
import ProjectCard from "../components/ProjectCard";
import type { postProp, projectProp, userProp } from "../interfaces";

const ExplorePage = () => {
    const [activeTab, setActiveTab] = useState("Developers");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({
        users: [],
        posts: [],
        projects: [],
    });
    const debouncedQuery = useDebounce(query, 500);
    const [loading, setLoading] = useState(false);

    // Fetch search results from backend
    useEffect(() => {
        const fetchSearch = async () => {
            if (!debouncedQuery.trim()) {
                setResults({ users: [], posts: [], projects: [] });
                return;
            }

            try {
                setLoading(true);
                const res = await axios.get(`${BACKEND_URL}/explore`, {
                    params: { q: debouncedQuery },
                    withCredentials: true,
                });
                setResults(res.data.results);
            } catch (error) {
                console.error("Error fetching explore data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearch();
    }, [debouncedQuery]);

    const developers = results.users || [];
    const posts = results.posts || [];
    const projects = results.projects || [];

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-5">Explore DevSphere</h1>

                {/* 🔍 Search Bar */}
                <div className="relative mb-8 max-w-xl">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search developers, posts, or projects..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-violet-500 text-sm"
                    />
                </div>

                {loading && <p className="text-center text-zinc-500 mb-4 animate-pulse">Searching...</p>}

                {/* 🧭 Tabs */}
                <div className="flex justify-start gap-6 border-b border-zinc-800 mb-6">
                    {["Developers", "Posts", "Projects"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-sm font-medium ${activeTab === tab
                                ? "border-b-2 border-violet-500 text-white"
                                : "text-zinc-400 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 🧑‍💻 Developers Tab */}
                {activeTab === "Developers" && (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {developers.length > 0 ? (
                            developers.map((dev: userProp) => (
                                <div
                                    key={dev._id}
                                    className="bg-zinc-900 border border-zinc-800 hover:border-violet-600 transition-all rounded-2xl p-4 flex flex-col items-center text-center"
                                >
                                    <img
                                        src={dev.profilePic}
                                        alt={dev.fullName}
                                        className="w-20 h-20 rounded-full object-cover border border-zinc-700"
                                    />
                                    <h2 className="mt-3 text-lg font-semibold">{dev.fullName}</h2>
                                    <p className="text-sm text-zinc-400">@{dev.username}</p>
                                    {dev.headline && (
                                        <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{dev.headline}</p>
                                    )}
                                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                                        {dev.skills?.map((skill: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-blue-900/60 text-blue-400 px-2 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-zinc-500 w-full">No developers found.</p>
                        )}
                    </div>
                )}

                {/* 📝 Posts Tab */}
                {activeTab === "Posts" && (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                        {posts.length > 0 ? (
                            posts.map((post: postProp) => (
                                <PostCard
                                    _id={post._id}
                                    text={post.text}
                                    imageUrl={post.imageUrl}
                                    code={post.code}
                                    link={post.link}
                                    user={post.user}
                                    likes={post.likes}
                                    comments={post.comments}
                                />
                            ))
                        ) : (
                            <p className="text-center text-zinc-500">No posts found.</p>
                        )}
                    </div>
                )}

                {/* 🚀 Projects Tab */}
                {activeTab === "Projects" && (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {projects.length > 0 ? (
                            projects.map((project: projectProp) => (
                                <ProjectCard
                                    _id={project._id}
                                    title={project.title}
                                    description={project.description}
                                    projectImage={project.projectImage}
                                    techStack={project.techStack}
                                    status={project.status}
                                    category={project.category}
                                    user={project.user}
                                    githubLink={project.githubLink}
                                    projectLink={project.projectLink}
                                />
                            ))
                        ) : (
                            <p className="text-center text-zinc-500 ">No projects found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
