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
            className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-black/80 backdrop-blur-md
  hover:border-emerald-500/30 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.25)]
  transition-all duration-300 ease-out hover:-translate-y-[3px]"
        >
            {/* Owner Menu */}
            {isOwner && (
                <div className="absolute top-3 right-3 z-10" ref={menuRef}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setMenuOpen((prev) => !prev);
                        }}
                        className="p-1.5 rounded-full bg-black/60 hover:bg-zinc-800/80 text-zinc-300 transition"
                    >
                        <EllipsisVertical size={18} />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-zinc-900/90 border border-zinc-700 rounded-lg shadow-lg text-sm text-zinc-300 animate-fadeIn">
                            <button
                                onClick={handleDelete}
                                className="w-full text-left px-4 py-2 hover:bg-red-500/20 hover:text-red-400 transition"
                            >
                                Delete Project
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-zinc-800 transition"
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <h2 className="text-base font-semibold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                        {title}
                    </h2>
                    <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase ${status === "Completed"
                                ? "bg-emerald-900/40 text-emerald-300 border border-emerald-600/30"
                                : "bg-amber-900/40 text-amber-300 border border-amber-600/30"
                            }`}
                    >
                        {status}
                    </span>
                </div>

                <p className="text-[13px] text-zinc-400 line-clamp-2 leading-snug mt-1">
                    {description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-2">
                    {techStack.slice(0, 3).map((tech, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-[2px] bg-zinc-800/70 border border-zinc-700/50 rounded-full text-[11px] text-zinc-300"
                        >
                            {tech}
                        </span>
                    ))}
                    {techStack.length > 3 && (
                        <span className="text-[11px] text-zinc-500">
                            +{techStack.length - 3}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between mt-3 border-t border-zinc-800 pt-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={user?.profilePic || "/default-avatar.png"}
                            alt={user?.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm text-white font-medium">
                                {user?.fullName}
                            </span>
                            <span className="text-xs text-zinc-500">@{user?.username}</span>
                        </div>
                    </div>

                    <span className="px-2 py-0.5 bg-zinc-800/70 border border-zinc-700/50 rounded-full text-[11px] text-zinc-400">
                        {category}
                    </span>
                </div>
            </div>
        </Link>

    );
};

export default ProjectCard;
