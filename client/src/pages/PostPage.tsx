import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../utils"
import { type commentProp, type postProp } from "../interfaces"
import { ArrowLeft, Ellipsis, Heart, MessageCircle } from "lucide-react"
import useUserStore from "../stores/userStore"
import toast from "react-hot-toast"
import usePostStore from "../stores/postStore"
import Spinner from "../components/Spinner"
import CommentCard from "../components/CommentCard"

const PostPage = () => {

    const { id } = useParams()

    const { user: currentUser } = useUserStore()
    const { deletePost, updatePostComment, likePost, unlikePost, posts } = usePostStore()
    const [post, setPost] = useState<postProp>()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [postLoading, setPostLoading] = useState(true)
    const [commentLoading, setCommentLoading] = useState(true)

    const [comment, setComment] = useState("");

    const [comments, setComments] = useState<commentProp[]>()

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

    const commentSubmit = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/comment/create/${id}`, { text: comment }, { withCredentials: true });

            setComments((prev) => [...(prev || []), response.data.comment])
            setPost(prev => prev ? { ...prev, comments: [...prev.comments, response.data.comment._id] } : prev)
            updatePostComment(id as string, response.data.comment)

        } catch (error) {
            console.error(error);
        } finally {
            setComment("");
        }
    }

    useEffect(() => {
        const getPost = async () => {
            setPostLoading(true)
            try {
                const response = await axios.get(`${BACKEND_URL}/post/${id}`, { withCredentials: true });
                console.log(response.data)
                setPost(response.data.post)
            } catch (error) {
                console.error(error);
            } finally {
                setPostLoading(false)
            }
        }
        const fetchComment = async () => {
            setCommentLoading(true)
            try {
                const response = await axios.get(`${BACKEND_URL}/comment/${id}`, { withCredentials: true });
                setComments(response.data.comments)
            } catch (error) {
                console.error(error)
            } finally {
                setCommentLoading(false)
            }
        }
        fetchComment()
        getPost()
    }, [id])

    const handleLikeToggle = async () => {
        if (!post || !currentUser?._id) return;

        const userId = currentUser._id;
        const isLiked = post.likes.includes(userId);

        // Optimistic update
        setPost(prev => prev ? {
            ...prev,
            likes: isLiked
                ? prev.likes.filter(id => id !== userId) // unlike
                : [...prev.likes, userId]                // like
        } : prev);

        try {
            if (isLiked) {
                await unlikePost(post._id, userId);
            } else {
                await likePost(post._id, userId);
            }
        } catch (err) {
            console.error(err);
            // Revert if failed
            setPost(prev => prev ? {
                ...prev,
                likes: isLiked
                    ? [...prev.likes, userId]
                    : prev.likes.filter(id => id !== userId)
            } : prev);
            toast.error("Failed to update like");
        }
    };

    if (postLoading || commentLoading) return (<div>
        <Spinner />
    </div>)

    if (!post) return (<div><p>Post not Found</p></div>)

    return (

        <div className="">
            <div className="p-5">
                <button onClick={() => navigate('/home')} className="p-2 bg-zinc-950 rounded-md border border-zinc-700 hover:bg-zinc-900 transition-all duration-300 cursor-pointer"><ArrowLeft /></button>

                {postLoading && <div className="flex justify-center items-center py-5"><Spinner /></div>}
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-2">
                {/* Header */}
                <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-3">
                        <img
                            className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                            src={post?.user.profilePic}
                            alt="profile"
                        />
                    </div>

                    <div className="flex-1 flex-col">
                        <div className="flex justify-between">

                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/user/${post.user._id}`)
                                }} className="font-bold tracking-tight cursor-pointer">{post?.user.fullName}</h1>

                                <p onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/user/${post.user._id}`)
                                }} className="text-sm text-zinc-500 cursor-pointer">@{post?.user.username}</p>
                            </div>

                            <div className="flex justify-between items-start">
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
                        </div>

                        <div className="flex flex-col gap-4 ">
                            {/* Post Text */}
                            <p className=" leading-none ">{post.text}</p>

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
                        <div className="flex gap-6 text-zinc-400 mt-4">
                            <div
                                className={`flex items-center gap-2 cursor-pointer transition ${post.likes.includes(currentUser?._id as string) ? "text-red-500" : "text-zinc-500 hover:text-red-500"
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent navigating to post
                                    console.log("Like")
                                    handleLikeToggle();
                                }}
                            >
                                <Heart size={15} />
                                <span className="text-xs">{post.likes.length}</span>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
                                <MessageCircle size={18} />
                                <span className="text-sm">{post.comments.length}</span>
                            </div>
                        </div>

                    </div>


                </div>



            </div>

            <div className="flex flex-col border-t border-zinc-700">
                <div className="flex flex-col gap-3 p-6 sm:p-8">
                    <div className="flex">
                        <img className="w-10 h-10  rounded-full border border-zinc-700" src={currentUser?.profilePic} alt="" />
                        <textarea
                            name="comment"
                            ref={textareaRef}
                            value={comment}
                            onChange={handleChange}
                            placeholder="Post your reply"
                            className="w-full outline-none p-3 rounded-md resize-none text-lg bg-transparent text-white"
                            rows={1}
                        />

                    </div>
                    <div className="flex justify-end">
                        <button onClick={commentSubmit} disabled={!comment.slice()} className="px-3 justify-end py-1 bg-white text-black rounded-full w-fit font-medium disabled:bg-neutral-500">Reply</button>
                    </div>
                </div>

                <div className="border-t border-zinc-700 flex justify-start py-5 mb-10 px-6 sm:px-10 flex-col gap-12">
                    {/* <p className="text-sm font-medium text-zinc-600">No Comments Yet.</p> */}
                    {comments?.length === 0 ?
                        (<p className="text-center text-zinc-500 font-medium">No Comments.</p>) : (
                            comments?.slice().reverse().map((comment) => (
                                <CommentCard
                                    key={comment._id}
                                    post={post}
                                    user={comment.user}
                                    text={comment.text}
                                />
                            ))
                        )
                    }


                </div>
            </div>

        </div>

    )
}

export default PostPage