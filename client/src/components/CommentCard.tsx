import { Ellipsis } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import useUserStore from "../stores/userStore";
import type { commentProp } from "../interfaces";

const CommentCard = ({ user, text }: commentProp) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);


    const { user: currentUser } = useUserStore()

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full flex gap-3 items-start">
            <div className="">
                <img className="w-10 h-10 rounded-full border border-zinc-700" src={user.profilePic} alt="" />
            </div>
            <div className="flex-1  items-center justify-between w-full">
                <div className="flex  items-center justify-between">

                    <div className="flex items-center gap-3">
                        <h1 className="font-bold tracking-tight ">{user.fullName}</h1>
                        <p className="text-sm text-zinc-500">@{user.username}</p>
                    </div>

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="hover:bg-zinc-900 p-2 rounded-full transition"
                        >
                            <Ellipsis
                                size={15} className="text-zinc-400 cursor-pointer" />
                        </button>

                        {menuOpen && user._id === currentUser?._id && (
                            <div className="flex flex-col items-start bg-zinc-900 rounded-md absolute -left-12 top-10 z-50 border border-zinc-700 shadow-[0.5px_0.5px_1px_1px] shadow-zinc-800">
                                <button
                                    onClick={() => alert("Edit")}
                                    className="text-sm font-semibold px-5 py-1 w-full cursor-pointer hover:text-blue-500 hover:bg-zinc-800 overflow-auto transition-all duration-300 "
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        alert("Delete")
                                    }}
                                    className="text-sm font-semibold w-full px-5 py-1 cursor-pointer text-red-500 hover:text-red-400 hover:bg-zinc-800  transition-all duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="">
                    <p className="leading-none">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default CommentCard