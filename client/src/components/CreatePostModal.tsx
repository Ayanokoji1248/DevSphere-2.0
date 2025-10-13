import { X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import usePostStore from '../stores/postStore';
import generateImageUrl from '../utils/generateImageUrl';
import useUserStore from '../stores/userStore';

interface modalProp {
    setModal: (open: boolean) => void
}

const CreatePostModal = ({ setModal }: modalProp) => {
    const root = document.getElementById("main") as HTMLElement;
    const [loading, setLoading] = useState(false);

    const [text, setText] = useState("")
    const [code, setCode] = useState("")
    const [link, setLink] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { addPost } = usePostStore()
    const { user } = useUserStore()

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("text", text);
            formData.append("code", code);
            formData.append("link", link);
            if (image) formData.append("image", image);

            if (!user || !user._id) {
                setLoading(false)
                return null
            }

            const imageUrl = await generateImageUrl(user._id, image as File)

            if (imageUrl == null) {
                setLoading(false)
                return
            }

            await addPost(text, code, link, imageUrl);

            setText("");
            setCode("");
            setLink("");
            setImage(null);
            setImagePreview(null);
            setModal(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-lg relative">
                {/* Close Button */}
                <button
                    onClick={() => setModal(false)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 hover:bg-zinc-950 rounded-full transition duration-300 cursor-pointer"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-white">Create Post</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Text */}
                    <div className="flex flex-col">
                        <label htmlFor="text" className="text-sm text-zinc-300 mb-1">Post Text</label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full bg-zinc-800 min-h-24 resize-none text-white p-2 rounded focus:outline-none"
                            required
                        />
                    </div>

                    {/* Code */}
                    <div className="flex flex-col">
                        <label htmlFor="code" className="text-sm text-zinc-300 mb-1">Code Snippet</label>
                        <textarea
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Add code snippet (optional)"
                            className="w-full bg-zinc-800 min-h-32 resize-none text-white p-2 rounded focus:outline-none"
                        />
                    </div>

                    {/* Link */}
                    <div className="flex flex-col">
                        <label htmlFor="link" className="text-sm text-zinc-300 mb-1">Link</label>
                        <input
                            id="link"
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Add a link (optional)"
                            className="w-full bg-zinc-800 text-white p-2 rounded focus:outline-none"
                        />
                    </div>

                    {/* Image */}
                    <div className="flex flex-col">
                        <label htmlFor="image" className="text-sm text-zinc-300 mb-1">Upload Image</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-sm text-zinc-400"
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="preview"
                                className="w-32 h-32 object-cover rounded mt-2"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded transition"
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </form>
            </div>
        </div>
        , root)
}

export default CreatePostModal;
