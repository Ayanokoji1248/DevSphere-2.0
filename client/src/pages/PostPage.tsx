import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../utils"
import { type postProp } from "../interfaces"
import { ArrowLeft, Ellipsis, Heart, MessageCircle } from "lucide-react"
import useUserStore from "../stores/userStore"
import toast from "react-hot-toast"
import usePostStore from "../stores/postStore"
import Spinner from "../components/Spinner"

const PostPage = () => {

    const { id } = useParams()
    const [post, setPost] = useState<postProp>()

    const { user: currentUser } = useUserStore()
    const { deletePost } = usePostStore()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true)

    const [comment, setComment] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);

        // Auto-resize logic
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // reset height
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // adjust height
        }
    };

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
                navigate('/home')
            }
        } catch (error) {
            console.log(error)
            toast.error("Post Deletion Failed")
        } finally {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        const getPost = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${BACKEND_URL}/post/${id}`, { withCredentials: true });
                console.log(response.data)
                setPost(response.data.post)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
        getPost()
    }, [id])

    if (!post) return (<div>
        <p>Post not found</p>
    </div>)

    return (
        <div className="">
            <div className="p-5">
                <button onClick={() => navigate('/home')} className="p-2 bg-zinc-950 rounded-md border border-zinc-700 hover:bg-zinc-900 transition-all duration-300 cursor-pointer"><ArrowLeft /></button>

                {loading && <div className="flex justify-center items-center py-5"><Spinner /></div>}
            </div>

            <div className="p-10 flex flex-col gap-2">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                        <img
                            className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                            src={post?.user.profilePic}
                            alt="profile"
                        />
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="font-medium">{post?.user.fullName}</h1>
                                <p className="text-sm text-zinc-500">@{post?.user.username}</p>
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

                        {menuOpen && post?.user._id === currentUser?._id && (
                            <div className="flex flex-col items-start bg-zinc-900 rounded-md absolute -left-12 top-10 z-50 border border-zinc-700 shadow-[0.5px_0.5px_1px_1px] shadow-zinc-800">
                                <button
                                    onClick={handleEdit}
                                    className="text-sm font-semibold px-5 py-1 w-full cursor-pointer hover:text-blue-500 hover:bg-zinc-800 overflow-auto transition-all duration-300 "
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        // console.log(_id)
                                        handleDelete(post?._id)
                                    }}
                                    className="text-sm font-semibold w-full px-5 py-1 cursor-pointer text-red-500 hover:text-red-400 hover:bg-zinc-800  transition-all duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Post Text */}
                <p className="text-sm leading-relaxed text-zinc-100 font-medium">{post.text}</p>

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
                {post.imageUrl && (
                    <div className="w-full aspect-auto bg-zinc-800 rounded-xl overflow-hidden">
                        <img
                            src={post.imageUrl}
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
                        <span className="text-sm">{post.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
                        <MessageCircle size={18} />
                        <span className="text-sm">12</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col border-t border-zinc-700">
                <div className="flex flex-col gap-3 p-5">
                    <div className="flex">
                        <img className="w-12 h-12 rounded-full border border-zinc-700" src={currentUser?.profilePic} alt="" />
                        <textarea
                            ref={textareaRef}
                            value={comment}
                            onChange={handleChange}
                            placeholder="Post your reply"
                            className="w-full outline-none p-3 rounded-md resize-none text-xl bg-transparent text-white"
                            rows={1}
                        />

                    </div>
                    <div className="flex justify-end">
                        <button disabled={true} className="px-3 justify-end py-1 bg-white text-black rounded-full w-fit font-medium disabled:bg-neutral-500">Reply</button>
                    </div>
                </div>

                <div className="border-t border-zinc-700 flex justify-center py-5">
                    <p className="text-sm font-medium text-zinc-600">No Comments Yet.</p>
                </div>
            </div>

        </div>
    )
}

export default PostPage