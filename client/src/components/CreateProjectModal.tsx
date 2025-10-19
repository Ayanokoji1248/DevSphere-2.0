import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import useUserStore from '../stores/userStore';
import useProjectStore from '../stores/projectStore';
import Spinner from './Spinner';

interface ModalProps {
    setModal: (open: boolean) => void;
}

const CreateProjectModal = ({ setModal }: ModalProps) => {
    const root = document.getElementById("project") as HTMLElement;

    const { user } = useUserStore();
    const { addProject } = useProjectStore()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [techStack, setTechStack] = useState<string[]>([]);
    const [tech, setTech] = useState("")
    const [status, setStatus] = useState("In Progress");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);


    const addTech = () => {
        setTechStack((prev) => [...prev, tech])
        setTech("")
    }

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

        // // For now just log the data
        // console.log({ title, description, githubLink, projectLink, techStack, status, category, image });

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

            // await addPost(text, code, link, imageUrl as string);

            await addProject(title, description, techStack, status, category, githubLink, projectLink, imageUrl as string);


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
                <h2 className="text-2xl font-semibold text-white mb-5">Create Project</h2>

                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded-md focus:outline-none focus:border-violet-500 transition"
                        required
                    />

                    {/* Description */}
                    <textarea
                        placeholder="Project Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded-md resize-none focus:outline-none focus:border-violet-500 transition min-h-[100px]"
                        required
                    />

                    <div className='flex items-center gap-2'>
                        {/* Tech Stack */}
                        <input
                            type="text"
                            placeholder="Tech Stack"
                            value={tech}
                            onChange={(e) => setTech(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded-md focus:outline-none focus:border-violet-500 transition"
                        />
                        <button type='button' onClick={addTech} className='flex-1 text-white p-3 rounded-md bg-zinc-900 transition-all duration-300 border border-zinc-700 cursor-pointer'><Plus /></button>
                    </div>
                    {
                        techStack.length > 0 &&
                        <div className='flex gap-2 flex-wrap'>
                            {techStack.map((tech, id) => (
                                <div key={id} className='text-white text-sm w-fit bg-zinc-800 px-2 py-1 rounded-md flex items-center justify-center gap-1 font-medium'>{tech}
                                    <button className='cursor-pointer'><X size={15} className='text-red-500' /></button>
                                </div>
                            ))}
                        </div>
                    }
                    {/* Status & Category */}
                    <div className="flex gap-2">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="p-3 rounded bg-zinc-900 text-white flex-1 focus:outline-none focus:border-violet-500 transition"
                        >
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Planned</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="p-3 rounded bg-zinc-900 text-white flex-1 focus:outline-none focus:border-violet-500 transition"
                        />
                    </div>

                    {/* Links */}
                    <input
                        type="url"
                        placeholder="GitHub Link"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded-md focus:outline-none focus:border-violet-500 transition"
                    />
                    <input
                        type="url"
                        placeholder="Live Project Link"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded-md focus:outline-none focus:border-violet-500 transition"
                    />

                    {/* Image */}
                    <div>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-md mt-2 border border-zinc-700"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-sm text-zinc-400 mt-2"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-md font-medium transition-all duration-300 cursor-pointer ${loading
                            ? "bg-violet-700 text-gray-300 cursor-not-allowed"
                            : "bg-violet-600 hover:bg-violet-700 text-white"
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Spinner />
                                <span>Creating...</span>
                            </div>
                        ) : (
                            "Create Project"
                        )}

                    </button>
                </form>
            </div>
        </div>,
        root
    );
};

export default CreateProjectModal;
