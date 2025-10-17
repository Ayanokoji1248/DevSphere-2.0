import { Code, Image, Link } from "lucide-react";
import PostCard from "../components/PostCard";
import usePostStore from "../stores/postStore";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useUserStore from "../stores/userStore";
import toast, { Toaster } from "react-hot-toast";
import CreatePostModal from "../components/CreatePostModal";

const HomePage = () => {
    const { posts, addPost } = usePostStore()
    const { isAuthenticated } = useAuthStore();
    const [loading, setLoading] = useState(false)

    const { user } = useUserStore()

    const [text, setText] = useState("")
    const [modal, setModal] = useState(false);

    const navigate = useNavigate()
    useEffect(() => {

        if (!isAuthenticated || user == null) {
            navigate('/login', { replace: true });
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])

    const onPost = async () => {
        setLoading(true)
        try {
            await addPost(text)
            toast.success("Post Successfully", { duration: 1000 })
        } catch (error) {
            console.error(error)
        } finally {
            setText("")
            setLoading(false)
        }
    }


    return (
        <div className="">
            {/* Create Post */}

            <Toaster />

            {modal && <CreatePostModal setModal={setModal} />}

            <div className="flex flex-col gap-5 p-8 w-full">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                    {/* Profile */}
                    <img
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-zinc-700"
                        src={user?.profilePic}
                        alt=""
                    />

                    {/* Textarea + Actions */}
                    <div className="flex-1 flex flex-col gap-2">
                        <textarea
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            className="w-full h-24 resize-none outline-none p-3 border border-zinc-600 rounded-md bg-zinc-950 text-sm font-medium placeholder:text-zinc-500"
                            name="feed"
                            id="feed"
                            placeholder="Share your latest project, code snippet, or developer insight..."
                        />

                        <div className="flex flex-col sm:flex-row items-stretch gap-2 mt-2">
                            <button onClick={() => setModal(true)} className="flex-1 border border-zinc-600 rounded-md p-2 hover:bg-zinc-900 transition cursor-pointer flex justify-center items-center gap-2">
                                <Link size={18} />
                                <span className="text-sm font-medium">Link</span>
                            </button>
                            <button onClick={() => setModal(true)} className="flex-1 border border-zinc-600 rounded-md p-2 hover:bg-zinc-900 transition cursor-pointer flex justify-center items-center gap-2">
                                <Image size={18} />
                                <span className="text-sm font-medium">Media</span>
                            </button>
                            <button onClick={() => setModal(true)} className="flex-1 border border-zinc-600 rounded-md p-2 hover:bg-zinc-900 transition cursor-pointer flex justify-center items-center gap-2">
                                <Code size={18} />
                                <span className="text-sm font-medium">Code</span>
                            </button>
                            <button disabled={!text.trim()}
                                onClick={onPost} className="disabled:bg-violet-700/70 disabled:cursor-default flex-1 p-3 bg-violet-600 rounded-md font-medium hover:bg-violet-700 transition cursor-pointer">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts */}
            <div className="mt-3 flex flex-col">
                {loading &&
                    <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 font-medium">Loading Post <Spinner /></div>
                }

                {
                    posts.length == 0 && <p className="flex items-center justify-center text-sm font-medium text-zinc-600 border-t pt-4">
                        No post yet.
                    </p>
                }

                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        _id={post._id}
                        text={post.text}
                        imageUrl={post.imageUrl}
                        code={post.code}
                        link={post.link}
                        user={post.user}
                        likes={post.likes}
                        comments={post.comments}
                    />
                ))}

            </div>
        </div>
    );
};

export default HomePage;
