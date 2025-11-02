import { Edit, X, Plus, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";
import useUserStore from "../stores/userStore";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import usePostStore from "../stores/postStore";

interface modalProp {
    setModal: (modal: boolean) => void
}

const EditProfileModal = ({ setModal }: modalProp) => {

    const root = document.getElementById("main") as HTMLElement;

    const { updateUserProfilePic } = usePostStore()

    const { user, setUser } = useUserStore()
    const [loading, setLoading] = useState(false)

    const [fullName, setFullName] = useState(user?.fullName);
    const [username, setUsername] = useState(user?.username);
    const [headline, setHeadline] = useState(user?.headline);
    const [bio, setBio] = useState(user?.bio);
    const [portfolioLink, setPortfolioLink] = useState(user?.portfolioLink);
    const [address, setAddress] = useState(user?.address);
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState(user?.skills);

    const [bannerPreview, setBannerPreview] = useState<string | null>(user?.bannerImage || null);
    const [bannerImage, setBannerImage] = useState<string | null>(user?.bannerImage || null);

    const [profilePreview, setProfilePreview] = useState<string | null>(user?.profilePic || null);
    const [profilePic, setProfilePic] = useState<string | null>(user?.profilePic || null);

    const [uploading, setUploading] = useState(false);


    const bannerImageRef = useRef<HTMLInputElement>(null);
    const profilePicRef = useRef<HTMLInputElement>(null);

    const handleSkills = () => {
        setSkills((prev) => [...(prev || []), skill])
        setSkill("")
    }

    const uploadToCloudinary = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "DevSphere");
        formData.append("folder", "uploads");

        setUploading(true)
        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dp7qerjic/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            return data.secure_url || null;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return null
        } finally {
            setUploading(false)
        }
    };

    // ✅ Handle Image Changes
    const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setBannerPreview(previewURL); // show preview immediately

            const uploadedUrl = await uploadToCloudinary(file);
            // console.log(uploadToCloudinary)
            if (uploadedUrl) setBannerImage(uploadedUrl);
        }
    };

    const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setProfilePreview(previewURL);

            const uploadedUrl = await uploadToCloudinary(file);
            // console.log(uploadToCloudinary)
            if (uploadedUrl) setProfilePic(uploadedUrl);
        }
    };

    const handleSkillDelete = (id: number) => {
        setSkills((prev) => prev?.filter((_, idx) => idx !== id))
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await axios.put(`${BACKEND_URL}/user/update`, {
                fullName,
                username,
                bannerImage,
                profilePic,
                headline,
                bio,
                portfolioLink,
                address,
                skills
            }, { withCredentials: true });
            console.log(response.data)
            setUser(response.data.user)
            updateUserProfilePic(user?._id as string, profilePic as string)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setModal(false)
        }
    }

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
            <div className="w-full max-w-lg max-h-[90vh] bg-zinc-950 rounded-xl shadow-xl text-white overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">

                {/* Modal Header */}
                <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-md px-5 py-3 flex justify-between items-center border-b border-zinc-800 z-10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setModal(false)}
                            className="p-2 rounded-full hover:bg-zinc-800 transition"
                        >
                            <X size={22} />
                        </button>
                        <h2 className="text-xl font-semibold">Edit Profile</h2>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className={`px-4 py-1 rounded-full font-medium transition flex items-center justify-between gap-2 ${loading
                            ? "bg-zinc-700 text-gray-300 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-200"
                            }`}
                    >   
                        {(uploading || loading) && <Loader2 className="animate-spin mr-2" size={16} />}
                        {uploading ? "Uploading..." : loading ? "Saving..." : "Save"}

                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-5 py-6 flex flex-col gap-6">

                    {/* Banner */}
                    <div className="relative w-full h-52 rounded-lg overflow-hidden bg-zinc-800/50 flex items-center justify-center cursor-pointer hover:bg-zinc-700/70 transition">
                        <img
                            src={bannerPreview || user?.bannerImage}
                            alt="banner"
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => bannerImageRef.current?.click()}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white/60 rounded-full text-black hover:bg-white transition"
                        >
                            <Edit size={20} />
                        </button>
                        <input
                            type="file"
                            ref={bannerImageRef}
                            onChange={handleBannerChange}
                            className="hidden"
                        />
                    </div>

                    {/* Profile Picture */}
                    <div className="relative w-28 h-28 rounded-full  border-2 border-zinc-600 -mt-14 ml-5">
                        <img
                            src={profilePreview || user?.profilePic}
                            alt="profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <button
                            onClick={() => profilePicRef.current?.click()}
                            className="absolute p-2 right-0 top-20 z-99 bg-black border border-zinc-500 rounded-full hover:bg-zinc-800 flex items-center justify-center cursor-pointer transition-all duration-300"
                        >
                            <Edit size={16} />
                        </button>
                        <input
                            type="file"
                            ref={profilePicRef}
                            onChange={handleProfileChange}
                            className="hidden"
                        />
                    </div>


                    {/* Form */}
                    <div className="flex flex-col gap-4 mt-6">

                        {/* Full Name & Username */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1 font-semibold">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Krish Prajapati"
                                    className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-700 outline-none focus:border-blue-500 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1 font-semibold">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="@krish1248"
                                    className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-700 outline-none focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

                        {/* Headline */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1 font-semibold">Headline</label>
                            <input
                                type="text"
                                value={headline}
                                onChange={(e) => setHeadline(e.target.value)}
                                placeholder="Full Stack Developer"
                                className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-700 outline-none focus:border-blue-500 transition"
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1 font-semibold">Description / Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={3}
                                placeholder="Building beautiful web apps and exploring creative tech 🌐✨"
                                className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-700 outline-none focus:border-blue-500 transition resize-none"
                            />
                        </div>

                        {/* Portfolio & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1 font-semibold">Website</label>
                                <input
                                    type="url"
                                    value={portfolioLink}
                                    onChange={(e) => setPortfolioLink(e.target.value)}
                                    placeholder="https://krishdevs.vercel.app"
                                    className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-700 outline-none focus:border-blue-500 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1 font-semibold">Location</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Ahmedabad, India"
                                    className="w-full p-2 rounded-md bg-zinc-900 border border-zinc-700 outline-none focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-col gap-2">
                            <label className="block text-sm text-zinc-400 font-semibold">Skills</label>
                            <div className="flex gap-2">
                                <input
                                    value={skill}
                                    onChange={(e) => setSkill(e.target.value)}
                                    placeholder="Add your skills"
                                    className="flex-1 p-2 rounded-md bg-zinc-900 border border-zinc-700 outline-none focus:border-blue-500 transition"
                                />
                                <button
                                    onClick={handleSkills}
                                    className="px-3 rounded-md bg-blue-700 hover:bg-blue-800 transition"
                                >
                                    <Plus />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {skills?.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/60 text-blue-400 text-sm font-medium"
                                    >
                                        {skill}
                                        <button onClick={() => handleSkillDelete(idx)}>
                                            <X size={14} className="text-red-400 hover:text-red-500 transition" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        ,
        root
    );
};

export default EditProfileModal;
