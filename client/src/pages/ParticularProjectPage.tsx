import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import type { projectProp } from "../interfaces";
import Spinner from "../components/Spinner";
import { GithubIcon } from "lucide-react";

const ParticularProjectPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [project, setProject] = useState<projectProp | null>(null);
    const [loading, setLoading] = useState(false)

    const getProject = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/project/${id}`, {
                withCredentials: true,
            });
            setProject(res.data.project);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading || !project) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-black">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-zinc-950 text-white px-4 py-8">
            {/* Back Button */}
            <div className="mb-4">
                <button
                    onClick={() => navigate("/project")}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 transition-all border border-zinc-700 duration-300 cursor-pointer rounded-lg font-semibold text-sm"
                >
                    &#8592; Back
                </button>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-6 pb-10 max-w-7xl mx-auto">
                {/* Left Panel */}
                <div className="sm:w-1/2 bg-zinc-900 rounded-2xl p-6 sm:p-10 flex flex-col gap-6 sm:sticky top-20">
                    {/* Project Title & Description */}
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-zinc-300 max-w-lg">{project.description}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold text-lg">Tech Used:</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Category & Status */}
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-blue-700/40 px-3 py-1 rounded-md w-fit">
                            <span className="font-bold">Category:</span>{" "}
                            <span className="font-medium">{project.category}</span>
                        </div>
                        <div className="bg-emerald-700/40 px-3 py-1 rounded-md w-fit">
                            <span className="font-bold">Status:</span>{" "}
                            <span className="font-medium">{project.status}</span>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 mt-4">
                        {project.projectLink && (
                            <a
                                href={project.projectLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 border border-white rounded-lg hover:bg-gray-700 hover:text-blue-500 font-semibold text-sm"
                            >
                                Live Project
                            </a>
                        )}
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 border border-white rounded-lg hover:bg-gray-700 hover:text-green-500 font-semibold text-sm flex items-center gap-2"
                            >
                                <GithubIcon size={16} /> GitHub
                            </a>
                        )}
                    </div>

                    {/* User Info */}
                    {project.user && (
                        <div className="mt-6 flex items-center gap-3 border-t border-gray-700 pt-4">
                            <Link to={`/user/${project.user._id}`} >
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={project.user.profilePic}
                                        alt={project.user.fullName}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </Link>
                            <div className="flex flex-col">
                                <Link to={`/user/${project.user._id}`} className="text-xl font-medium">{project.user.fullName}</Link>
                                <Link to={`/user/${project.user._id}`} className="text-zinc-500">@{project.user.username}</Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel - Project Image */}
                <div className="sm:w-1/2 flex justify-center items-start">
                    <img
                        src={project.projectImage}
                        alt={project.title}
                        className="rounded-2xl object-cover w-full sm:max-h-[500px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default ParticularProjectPage;
