import { Edit, X, Plus } from "lucide-react";
import { createPortal } from "react-dom";

const EditProfileModal = () => {
    const root = document.getElementById("root") as HTMLElement;

    return createPortal(
        <div className="w-full min-h-screen bg-zinc-950/70 fixed z-10 flex justify-center items-center">

            <div className='w-[500px] max-h-[600px] overflow-y-auto bg-zinc-950 shadow-zinc-800 shadow-[2px_2px_15px_5px] rounded-xl text-white'>

                {/* Modal Header */}
                <div className="p-4 px-5 flex items-center justify-between sticky top-0 z-10 bg-black">
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-zinc-800 transition-all duration-300 cursor-pointer rounded-full">
                            <X size={22} />
                        </button>
                        <h1 className="text-xl font-semibold">Edit Profile</h1>
                    </div>
                    <button className="font-medium bg-white text-black px-4 py-1 rounded-full text-sm hover:bg-slate-300 transition-all duration-300 cursor-pointer">
                        Save
                    </button>
                </div>

                {/* Modal Content */}
                <div className="mt-4 px-5 flex flex-col gap-4">

                    {/* Cover Image */}
                    <div className="w-full relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full text-black cursor-pointer transition-all duration-300">
                            <Edit size={20} />
                        </div>
                        <img
                            className="w-full h-52 object-cover rounded-md"
                            src="https://i.pinimg.com/1200x/9e/38/9b/9e389bba77e81941f387290dea008b44.jpg"
                            alt="banner"
                        />
                        {/* Profile Image */}
                        <div className="absolute -bottom-10 left-5 w-24 h-24 border-4 border-zinc-950 rounded-full overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src="https://i.pinimg.com/736x/02/17/32/02173233b8f91145e3f8707dde5c0dbd.jpg"
                                alt="profile"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full text-black cursor-pointer transition-all duration-300">
                                <Edit size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="mt-15 flex flex-col gap-4 pb-5">

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Full Name</label>
                            <input className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="text" placeholder="Krish Prajapati" />
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Username</label>
                            <input className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="text" placeholder="@crish1248" />
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Headline</label>
                            <input className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="text" placeholder="Full Stack Developer" />
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Description / Bio</label>
                            <textarea className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md resize-none" rows={3} placeholder="Building beautiful web apps and exploring creative tech 🌐✨"></textarea>
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Website</label>
                            <input className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="url" placeholder="https://krishdevs.vercel.app" />
                        </div>

                        <div>
                            <label className="font-semibold text-sm text-zinc-400">Location</label>
                            <input className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" type="text" placeholder="Ahmedabad, India" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <label className="font-semibold text-sm text-zinc-400">Skills</label>
                                <input type="text" className="w-full p-2 text-sm outline-none border border-zinc-500 rounded-md" placeholder="Add your skills" />
                            </div>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="px-2 py-1 bg-blue-900/60 text-blue-400 text-sm rounded-full font-medium flex items-center gap-1">
                                    React <Plus size={12} />
                                </span>
                                <span className="px-2 py-1 bg-blue-900/60 text-blue-400 text-sm rounded-full font-medium flex items-center gap-1">
                                    Node.js <Plus size={12} />
                                </span>
                                <span className="px-2 py-1 bg-blue-900/60 text-blue-400 text-sm rounded-full font-medium flex items-center gap-1">
                                    MongoDB <Plus size={12} />
                                </span>
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
