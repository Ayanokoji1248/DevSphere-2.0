import { useState, useRef, useEffect } from "react";
import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import type { postProp } from "../interfaces";
import useUserStore from "../stores/userStore";
import toast from "react-hot-toast";
import usePostStore from "../stores/postStore";
import { useNavigate } from "react-router-dom";

const PostCard = ({ _id, text, imageUrl, code, link, user, likes, comments }: postProp) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { user: currentUser } = useUserStore()

    const { deletePost } = usePostStore()

    const navigate = useNavigate()

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

    const handleDelete = async (postId: string) => {
        try {
            const deleteConfirm = confirm("Do you want to delete it?");
            if (deleteConfirm) {
                await deletePost(postId);
                toast.success("Post deleted successfully")
            }
        } catch (error) {
            console.log(error)
            toast.error("Post Deletion Failed")
        } finally {
            setMenuOpen(false);
        }
    };

    return (
        <div onClick={() => navigate(`/post/${_id}`)} className="w-full bg-black text-white border-y border-zinc-800 p-6 md:px-8 flex gap-4 rounded-lg hover:bg-[#090909] cursor-pointer transition-all duration-300">
            <div className="flex gap-3">
                <img
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    src={user.profilePic}
                    alt="profile"
                />
            </div>

            <div className="flex-1 flex-col">
                <div className="flex  justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/user/${user._id}`)
                        }} className="font-bold tracking-tight">{user.fullName}</h1>
                        <p onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/user/${user._id}`)
                        }} className="text-sm text-zinc-500">@{user.username}</p>
                    </div>

                    <div className="flex justify-between items-start">

                        {/* Ellipsis button */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setMenuOpen(!menuOpen)
                                }}
                                className="hover:bg-zinc-900 p-2 rounded-full transition"
                            >
                                <Ellipsis className="text-zinc-400 cursor-pointer" size={15} />
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
                                        onClick={() => {
                                            console.log(_id)
                                            handleDelete(_id)
                                        }}
                                        className="text-sm font-semibold w-full px-5 py-1 cursor-pointer text-red-500 hover:text-red-400 hover:bg-zinc-800  transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">

                    {/* Post Text */}
                    <p className="leading-none">{text}</p>

                    {/* Link */}
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block border border-blue-700 rounded-lg p-4 font-medium outline-none bg-blue-950/50"
                        >
                            <p className="text-xs lg:text-sm w-full wrap-break-word text-blue-500">{link}</p>
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
                        <div className="w-full aspect-auto bg-zinc-800 rounded-xl overflow-hidden">
                            <img
                                loading="lazy"
                                src={imageUrl}
                                alt="post"
                                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                            />
                        </div>
                    )}
                </div>

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
                <div className="flex gap-6 text-zinc-500 mt-4">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                        <Heart size={15} />
                        <span className="text-xs">{likes.length}</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
                        <MessageCircle size={15} />
                        <span className="text-xs">{comments.length}</span>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default PostCard;
