import {
    Code,
    Ellipsis,
    FolderCode,
    Globe,
    HomeIcon,
    LogOut,
    Search,
    User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useUserStore from "../stores/userStore";
import useAuthStore from "../stores/authStore";
import CreatePostModal from "./CreatePostModal";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [logoutMenu, setLogoutMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [modal, setModal] = useState(false)
    const { logout } = useAuthStore();
    const { user } = useUserStore();

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setLogoutMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const logoutUser = async () => {
        await logout()
    }

    return (
        <div className="hidden md:flex w-full md:w-[20%] h-screen border-b md:border-b-0 md:border-r border-zinc-600  flex-col justify-between items-center px-2 py-4 md:py-6 sticky top-0 bg-zinc-950">

            {modal && <CreatePostModal setModal={setModal} />}

            {/* Top Section */}
            <div className="flex flex-col justify-center gap-10 px-4 w-full">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Globe size={32} className="text-white" />
                    <div>
                        <h1 className="text-white font-bold font-[Albert_Sans] text-xl md:text-2xl">
                            DevSphere
                        </h1>
                        <p className="text-xs text-zinc-400 font-medium">
                            Connect • Code • Create
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-1 w-full">
                    {[
                        { icon: <HomeIcon />, label: "Home", path: "/home" },
                        { icon: <Search />, label: "Explore", path: "/explore" },
                        { icon: <FolderCode />, label: "Projects", path: "/project" },
                        { icon: <Code />, label: "Code Review", path: "/home" },
                        { icon: <User />, label: "Profile", path: `/user/${user?._id}` },
                    ].map((item, index) => (
                        <Link to={item.path}
                            key={index}
                            className="flex items-center justify-start p-3 px-5 gap-5 hover:bg-zinc-900 rounded-full transition-all duration-300 cursor-pointer w-fit"
                        >
                            {item.icon}
                            <h2 className="text-xl font-semibold">{item.label}</h2>
                        </Link>
                    ))}

                    {/* Post Button */}
                    <button
                        onClick={() => {
                            setModal(true)
                        }} className="w-full p-3 bg-violet-600 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-violet-700 cursor-pointer mt-3">
                        Post
                    </button>
                </div>
            </div>

            {/* Profile Section */}
            <div ref={menuRef} className="relative w-full">
                <button
                    onClick={() => setLogoutMenu(!logoutMenu)}
                    className="w-full p-3 hover:bg-zinc-900 rounded-full cursor-pointer transition-all duration-300 flex justify-between items-center"
                >
                    <div className="flex items-center gap-3">
                        <img
                            className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                            src={user?.profilePic}
                            alt="profile"
                        />
                        <div className="flex flex-col text-left">
                            <h1 className="font-semibold text-white">{user?.fullName}</h1>
                            <p className="text-sm text-zinc-500 font-medium">@{user?.username}</p>
                        </div>
                    </div>
                    <Ellipsis size={20} className="text-zinc-400" />
                </button>

                {/* Logout Dropdown */}
                {logoutMenu && (
                    <div
                        className="absolute bottom-[80px] left-0 w-full bg-zinc-900 border border-zinc-700 
                       p-3 rounded-md animate-fadeIn z-50 shadow-lg"
                    >
                        <button
                            onClick={() => {
                                logoutUser()
                                setLogoutMenu(false)
                            }}
                            className="text-red-500 font-medium hover:text-red-600 transition w-full flex items-center justify-between cursor-pointer"
                        >
                            Logout

                            <LogOut size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
