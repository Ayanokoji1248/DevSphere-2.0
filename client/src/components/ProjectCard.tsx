import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { EllipsisVertical } from "lucide-react";
import type { projectProp } from "../interfaces";
import useUserStore from "../stores/userStore";
import useProjectStore from "../stores/projectStore";

const ProjectCard = ({
    _id,
    title,
    description,
    projectImage,
    techStack,
    status,
    category,
    user,
}: projectProp) => {
    const { user: currentUser } = useUserStore();

    const { deleteProject } = useProjectStore()

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const isOwner = currentUser?._id === user?._id;

    // 🧠 Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault(); // prevent link navigation
        const deleteConfirm = confirm("Are you sure you want to delete?")
        if (deleteConfirm) {
            deleteProject(_id)
        }
        setMenuOpen(false);
    };

    return (
        <Link
            to={`/project/${_id}`}
            key={_id}
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
            {/* Owner Menu */}
            {isOwner && (
                <div className="absolute top-3 right-3 z-10" ref={menuRef}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setMenuOpen((prev) => !prev);
                        }}
                        className="p-1 rounded-full
                        bg-zinc-900/50 hover:bg-zinc-800 text-white transition"
                    >
                        <EllipsisVertical size={18} />
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg text-sm text-zinc-300 animate-fadeIn">
                            <button
                                onClick={handleDelete}
                                className="w-full text-left px-4 py-2 hover:bg-red-600/20 hover:text-red-400 rounded-t-lg transition"
                            >
                                Delete Project
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-zinc-800 rounded-b-lg transition"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Project Image */}
            <div className="relative w-full h-44 overflow-hidden">
                <img
                    src={projectImage || "/placeholder.png"}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors duration-300">
                    {title}
                </h2>

                <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>

                <div className="flex flex-wrap gap-2 mt-1">
                    {techStack.slice(0, 3).map((tech, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-0.5 bg-zinc-800/80 text-xs text-white rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                    {techStack.length > 3 && (
                        <span className="text-xs text-zinc-500">
                            +{techStack.length - 3}
                        </span>
                    )}
                </div>

                <div className="flex justify-between mt-2 text-xs">
                    <span
                        className={`px-2 py-1 rounded-full ${status === "Completed"
                            ? "bg-emerald-900/50 text-emerald-300"
                            : "bg-amber-900/40 text-amber-300"
                            }`}
                    >
                        {status}
                    </span>
                    <span className="px-2 py-1 bg-zinc-800/70 rounded-full text-zinc-300">
                        {category}
                    </span>
                </div>

                <div className="flex items-center gap-3 mt-3 border-t border-zinc-800 pt-3">
                    <img
                        src={user?.profilePic || "/default-avatar.png"}
                        alt={user?.fullName}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-medium text-white">
                            {user?.fullName}
                        </span>
                        <span className="text-xs text-zinc-500">@{user?.username}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
