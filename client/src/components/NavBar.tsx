import {
    Globe, Menu, Code,
    FolderCode,
    HomeIcon,
    LogOut,
    Search,
    User,
} from "lucide-react"
import { useState } from "react"
import useUserStore from "../stores/userStore";
import useAuthStore from "../stores/authStore";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [navToggle, setNavToggle] = useState(false);

    const { user } = useUserStore();
    const { logout } = useAuthStore()

    const menuItems = [
        { name: "Home", icon: <HomeIcon size={20} />, path: "/home" },
        { name: "Explore", icon: <Search size={20} />, path: "/home" },
        { name: "Projects", icon: <FolderCode size={20} />, path: "/project" },
        { name: "Code Review", icon: <Code size={20} />, path: "/home" },
        { name: "Profile", icon: <User size={20} />, path: `/user/${user?._id}` },
    ]


    return (
        <div className="md:hidden border-b border-zinc-700 p-4 fixed w-full flex flex-col gap-3 bg-black z-[20]">
            <div className="flex items-center justify-between">

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
                <div onClick={() => setNavToggle(!navToggle)} className="p-2 hover:bg-zinc-900 rounded-md transition-all duration-300 cursor-pointer">
                    <Menu />
                </div>
            </div>
            {
                navToggle &&
                <div className=" bg-black flex flex-col">
                    {menuItems.map((item, idx) => (
                        <Link to={item.path} key={idx}
                            onClick={() => setNavToggle(false)}
                            className="w-fit flex gap-2 p-2 items-center hover:bg-zinc-900 rounded-full transition-all duration-300 cursor-pointer">{item.icon}{item.name}</Link>
                    ))}
                    <button onClick={logout} className="p-2 flex items-center hover:bg-red-900/30 w-fit rounded-full gap-2 text-red-500 cursor-pointer"><LogOut size={20} /> Logout </button>
                </div>
            }
        </div>
    )
}

export default NavBar