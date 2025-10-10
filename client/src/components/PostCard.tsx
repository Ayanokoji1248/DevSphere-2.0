import { useState, useRef, useEffect } from "react";
import { Ellipsis, Heart, MessageCircle } from "lucide-react";

const PostCard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const post = {
        user: {
            name: "Krish Prajapati",
            username: "crish1248",
            avatar:
                "https://i.pinimg.com/1200x/00/80/fc/0080fcbb036ac608f882c656509ea355.jpg",
        },
        text: "Just finished working on my new full-stack project using React, Node.js, and MongoDB! 🚀 Super proud of the result!",
        image:
            "https://i.pinimg.com/1200x/3e/11/7a/3e117a1ab14736aa913ee9375c26d7fd.jpg",
        link: "https://github.com/krish1248/devsphere",
        code: `const greet = (name: string) => console.log(\`Hello, \${name}!\`);
greet("World");`,
        tags: ["React", "NodeJS", "MERN", "DevSphere"],
        likes: 128,
        comments: 42,
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEdit = () => {
        alert("Edit clicked!");
        setMenuOpen(false);
    };

    const handleDelete = () => {
        alert("Delete clicked!");
        setMenuOpen(false);
    };

    return (
        <div className="w-full bg-black text-white border-y border-zinc-800 p-6 flex flex-col gap-4 rounded-lg hover:bg-[#090909] cursor-pointer transition-all duration-300">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={post.user.avatar}
                        alt="profile"
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="font-medium">{post.user.name}</h1>
                            <p className="text-sm text-zinc-500">@{post.user.username}</p>
                        </div>
                    </div>
                </div>

                {/* Ellipsis button */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="hover:bg-zinc-900 p-2 rounded-full transition"
                    >
                        <Ellipsis className="text-zinc-400 cursor-pointer" />
                    </button>

                    {menuOpen && (
                        <div className="flex flex-col items-start bg-zinc-900 rounded-md absolute -left-12 top-10 z-50 border border-zinc-700 shadow-[0.5px_0.5px_1px_1px] shadow-zinc-800">
                            <button
                                onClick={handleEdit}
                                className="text-sm font-semibold px-5 py-1 w-full cursor-pointer hover:text-blue-500 hover:bg-zinc-800 overflow-auto transition-all duration-300 "
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-sm font-semibold w-full px-5 py-1 cursor-pointer text-red-500 hover:text-red-400 hover:bg-zinc-800  transition-all duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Post Text */}
            <p className="text-sm leading-relaxed text-zinc-100">{post.text}</p>

            {/* Link */}
            {post.link && (
                <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-blue-700 rounded-lg p-4 font-medium outline-none bg-blue-950/50"
                >
                    <p className="text-md text-blue-500 truncate">{post.link}</p>
                </a>
            )}

            {/* Code */}
            {post.code && (
                <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-200 whitespace-pre-wrap break-words">
                    <code className="text-emerald-500">{post.code}</code>
                </pre>
            )}

            {/* Image */}
            {post.image && (
                <div className="w-full min-h-72 bg-zinc-800 rounded-xl overflow-hidden">
                    <img
                        src={post.image}
                        alt="post"
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                    />
                </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-xs font-medium bg-zinc-800 px-2 py-1 rounded-md text-zinc-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-6 text-zinc-400 mt-2">
                <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                    <Heart size={18} />
                    <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
                    <MessageCircle size={18} />
                    <span className="text-sm">{post.comments}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
