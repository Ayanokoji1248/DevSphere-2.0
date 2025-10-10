import { useState, useRef, useEffect } from "react";
import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import type { postProp } from "../interfaces";
import useUserStore from "../stores/userStore";

const PostCard = ({ text, imageUrl, code, link, user, likes }: postProp) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { user: currentUser } = useUserStore()

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
                        src={user.profilePic}
                        alt="profile"
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="font-medium">{user.fullName}</h1>
                            <p className="text-sm text-zinc-500">@{user.username}</p>
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

                    {menuOpen && user._id === currentUser?._id && (
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
            <p className="text-sm leading-relaxed text-zinc-100">{text}</p>

            {/* Link */}
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-blue-700 rounded-lg p-4 font-medium outline-none bg-blue-950/50"
                >
                    <p className="text-md text-blue-500 truncate">{link}</p>
                </a>
            )}

            {/* Code */}
            {code && (
                <pre className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-200 whitespace-pre-wrap break-words">
                    <code className="text-emerald-500">{code}</code>
                </pre>
            )}

            {/* Image */}
            {imageUrl && (
                <div className="w-full min-h-72 bg-zinc-800 rounded-xl overflow-hidden">
                    <img
                        src={imageUrl}
                        alt="post"
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                    />
                </div>
            )}

            {/* Tags */}
            {/* {post.tags && post.tags.length > 0 && (
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
            )} */}

            {/* Actions */}
            <div className="flex gap-6 text-zinc-400 mt-2">
                <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                    <Heart size={18} />
                    <span className="text-sm">{likes.length}</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
                    <MessageCircle size={18} />
                    <span className="text-sm">12</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
