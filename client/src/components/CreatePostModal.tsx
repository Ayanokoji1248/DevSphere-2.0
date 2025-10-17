import { X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import usePostStore from '../stores/postStore';
import useUserStore from '../stores/userStore';

interface modalProp {
    setModal: (open: boolean) => void;
}

const CreatePostModal = ({ setModal }: modalProp) => {
    const root = document.getElementById("main") as HTMLElement;
    const [loading, setLoading] = useState(false);

    const [text, setText] = useState("");
    const [code, setCode] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { addPost } = usePostStore();
    const { user } = useUserStore();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadToCloudinary = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "DevSphere"); // replace with your unsigned preset
        formData.append("folder", "uploads"); // optional: Cloudinary folder name

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dp7qerjic/image/upload", // replace YOUR_CLOUD_NAME
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();
            return data.secure_url || null;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!user || !user._id) {
                setLoading(false);
                return;
            }

            let imageUrl: string | null = null;
            if (image) {
                imageUrl = await uploadToCloudinary(image);
                if (!imageUrl) {
                    alert("Image upload failed!");
                    setLoading(false);
                    return;
                }
                console.log(imageUrl)
            }

            await addPost(text, code, link, imageUrl as string);

            // reset
            setText("");
            setCode("");
            setLink("");
            setImage(null);
            setImagePreview(null);
            setModal(false);
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-zinc-950 rounded-xl shadow-xl w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900 border border-zinc-800">

                {/* Close Button */}
                <button
                    onClick={() => setModal(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white transition duration-300 cursor-pointer"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-semibold text-white mb-5">Create Post</h2>

                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                    {/* Post Text */}
                    <div className="flex flex-col">
                        <label htmlFor="text" className="text-sm text-zinc-400 mb-1 font-medium">
                            Post Text
                        </label>
                        <textarea
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded-md resize-none focus:outline-none focus:border-violet-500 transition min-h-[80px]"
                            required
                        />
                    </div>

                    {/* Code Snippet */}
                    <div className="flex flex-col">
                        <label htmlFor="code" className="text-sm text-zinc-400 mb-1 font-medium">
                            Code Snippet (Optional)
                        </label>
                        <textarea
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Add code snippet"
                            className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded-md resize-none focus:outline-none focus:border-violet-500 transition min-h-[120px]"
                        />
                    </div>

                    {/* Link */}
                    <div className="flex flex-col">
                        <label htmlFor="link" className="text-sm text-zinc-400 mb-1 font-medium">
                            Link (Optional)
                        </label>
                        <input
                            id="link"
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Add a link"
                            className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded-md focus:outline-none focus:border-violet-500 transition"
                        />
                    </div>

                    {/* Image */}
                    <div className="flex flex-col">
                        <label htmlFor="image" className="text-sm text-zinc-400 mb-1 font-medium">
                            Upload Image
                        </label>
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
                                className="w-32 h-32 object-cover rounded-md mt-2 border border-zinc-700"
                            />
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-md font-medium transition ${loading
                                ? "bg-violet-700 text-gray-300 cursor-not-allowed"
                                : "bg-violet-600 hover:bg-violet-700 text-white"
                            }`}
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </form>
            </div>
        </div>
        ,
        root
    );
};

export default CreatePostModal;
