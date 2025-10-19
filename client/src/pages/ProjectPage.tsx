import { useState } from "react";
import { Link } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";

const mockProjects = [
    {
        id: "1",
        title: "DevSphere Dashboard",
        description: "Full-stack dashboard built with MERN and TailwindCSS.",
        projectImage: "https://images.unsplash.com/photo-1581091012184-5e8c3c5b8f9c?auto=format&fit=crop&w=800&q=80",
        techStack: ["React", "Node.js", "MongoDB"],
        status: "In Progress",
        category: "Web Development",
    },
    {
        id: "2",
        title: "Crypto Wallet App",
        description: "A web-based crypto wallet with React and Node.js.",
        projectImage: "https://images.unsplash.com/photo-1558888401-993dd2766f3b?auto=format&fit=crop&w=800&q=80",
        techStack: ["React", "Node.js", "Express"],
        status: "Completed",
        category: "FinTech",
    },
    // add more mock projects
];

const ProjectPage = () => {
    const [modal, setModal] = useState(false)
    return (
        <div className="min-h-screen p-4 pt-8 md:p-8 space-y-6">

            {modal &&
                <CreateProjectModal setModal={setModal} />}

            {/* Header */}
            <div className="flex flex-row justify-between items-center ">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold">Discover Projects</h1>
                    <p className="text-sm w-72 text-zinc-400">Explore amazing projects built by developers worldwide.</p>
                </div>
                <button
                    onClick={() => setModal(true)} className="px-4 py-2 bg-zinc-950 border border-zinc-600 rounded hover:bg-zinc-900 text-white transition-all duration-300 cursor-pointer text-sm">
                    Add Project
                </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
                {mockProjects.map((project) => (
                    <Link
                        to={`/projects/${project.id}`}
                        key={project.id}
                        className="bg-zinc-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                    >
                        <img
                            src={project.projectImage}
                            alt={project.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4 flex flex-col gap-2">
                            <h2 className="text-lg font-semibold">{project.title}</h2>
                            <p className="text-zinc-400 text-sm line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.techStack.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 bg-zinc-800 rounded-full text-xs text-white"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-sm text-zinc-400">
                                <span>{project.status}</span>
                                <span>{project.category}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;
