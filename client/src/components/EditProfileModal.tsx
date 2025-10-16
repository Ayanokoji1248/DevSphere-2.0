import { Edit, X, Plus } from "lucide-react";
import { createPortal } from "react-dom";
import useUserStore from "../stores/userStore";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";

interface modalProp {
    setModal: (modal: boolean) => void
}

const EditProfileModal = ({ setModal }: modalProp) => {

    const root = document.getElementById("main") as HTMLElement;

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

    const [bannerImage, setBannerImage] = useState<string | null>(user?.bannerImage || null);
    const [profilePic, setProfilePic] = useState<string | null>(user?.profilePic || null);

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

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dp7qerjic/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            return data.secure_url || null;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return null;
        }
    };

    // ✅ Handle Image Changes
    const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setBannerImage(previewURL); // show preview immediately

            const uploadedURL = await uploadToCloudinary(file); // upload to Cloudinary
            if (uploadedURL) setBannerImage(uploadedURL); // replace with uploaded image URL
        }
    };

    const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setProfilePic(previewURL);

            const uploadedURL = await uploadToCloudinary(file);
            if (uploadedURL) setProfilePic(uploadedURL);
        }
    };

    const handleSkillDelete = (id: number) => {
        setSkills((prev) => prev?.filter((_, idx) => idx !== id))
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await axios.put(`${BACKEND_URL}/user/${user?._id}`, {
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
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setModal(false)
        }
    }

    return createPortal(
        <div className="w-full min-h-screen bg-zinc-950/70 fixed inset-0 z-[99999] flex justify-center items-center">

            <div className='w-[500px] max-h-[600px] bg-zinc-950 shadow-zinc-800 shadow-[2px_2px_15px_5px] rounded-xl text-white scrollbar-thumb-white scrollbar-thin scrollbar-track-zinc-950 overflow-y-scroll'>

                {/* Modal Header */}
                <div className="p-4 px-5 flex items-center justify-between sticky top-0 z-10 bg-black">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setModal(false)} className="p-1 hover:bg-zinc-800 transition-all duration-300 cursor-pointer rounded-full">
                            <X size={22} />
                        </button>
                        <h1 className="text-xl font-semibold">Edit Profile</h1>
                    </div>
                    <button onClick={handleSubmit} className="font-medium bg-white text-black px-4 py-1 rounded-full text-sm hover:bg-slate-300 transition-all duration-300 cursor-pointer">
                        {loading ? "Saving" : "Save"}
                    </button>
                </div>

                {/* Modal Content */}
                <div className="mt-4 px-5 flex flex-col gap-4">

                    {/* Cover Image */}
                    <div className="w-full relative">
                        <button onClick={() => bannerImageRef.current?.click()} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white/50 rounded-full text-black cursor-pointer transition-all duration-300">
                            <Edit size={20} />

                        </button>
                        <input onChange={handleBannerChange} ref={bannerImageRef} type="file" className="hidden" />
                        <img
                            className="w-full h-52 object-cover rounded-md"
                            src={bannerImage || user?.bannerImage}
                            alt="banner"
                        />

                        {/* Profile Image */}
                        <div className="absolute -bottom-10 left-5 w-24 h-24 border border-zinc-500 rounded-full overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src={profilePic || user?.profilePic}
                                alt="profile"
                            />
                            <button onClick={() => { profilePicRef.current?.click() }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full text-black cursor-pointer transition-all duration-300">
                                <Edit size={15} />
                            </button>
                            <input ref={profilePicRef} onChange={handleProfileChange} type="file" className="hidden" />
                        </div>
                    </div>

                    {/* Form */}
                    <div className="mt-15 flex flex-col gap-4 pb-5">

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Full Name</label>
                            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="text" placeholder="Krish Prajapati" />
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="text" placeholder="@crish1248" />
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Headline</label>
                            <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="text" placeholder="Full Stack Developer" />
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Description / Bio</label>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md resize-none" rows={3} placeholder="Building beautiful web apps and exploring creative tech 🌐✨"></textarea>
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Website</label>
                            <input value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="url" placeholder="https://krishdevs.vercel.app" />
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Location</label>
                            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="text" placeholder="Ahmedabad, India" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <label className="font-semibold text-sm text-zinc-400">Skills</label>
                                <div className="flex gap-2">
                                    <input value={skill} onChange={(e) => setSkill(e.target.value)} type="text" className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" placeholder="Add your skills" />
                                    <button onClick={handleSkills} className="bg-zinc-800 px-2 rounded-md cursor-pointer hover:bg-zinc-900 transition-all duration-300"><Plus /></button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {skills?.map((skill, idx) => (
                                    <span className="px-2 py-1 bg-blue-900/60 text-blue-400 text-sm rounded-full font-medium flex items-center gap-1">
                                        {skill}
                                        <button onClick={() => handleSkillDelete(idx)} className="cursor-pointer">
                                            <X className="text-red-500" size={15} />
                                        </button>
                                    </span>
                                ))}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>,
        root
    );
};

export default EditProfileModal;
