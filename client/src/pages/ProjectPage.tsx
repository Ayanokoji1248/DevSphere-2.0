import { useEffect, useState } from "react";
import CreateProjectModal from "../components/CreateProjectModal";
import useProjectStore from "../stores/projectStore";
import Spinner from "../components/Spinner";
import ProjectCard from "../components/ProjectCard";


const ProjectPage = () => {
    const [modal, setModal] = useState(false)
    const { fetchProjects, projects } = useProjectStore()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                await fetchProjects()
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="min-h-screen p-4 pt-8 md:p-8 space-y-6">

            {modal &&
                <CreateProjectModal setModal={setModal} />}

            {/* Header */}
            <div className="flex flex-row justify-between items-center flex-wrap gap-3">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold">Discover Projects</h1>
                    <p className="text-sm w-72 text-zinc-400">Explore amazing projects built by developers worldwide.</p>
                </div>
                <button
                    onClick={() => setModal(true)} className="px-4 py-2 bg-violet-600 border border-zinc-600 rounded hover:bg-violet-700 text-white transition-all duration-300 font-medium cursor-pointer text-sm">
                    Add Project
                </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">

                {loading && <div>
                    <p>Loading...</p>
                    <Spinner />
                </div>}

                {!loading && projects.length === 0 && <div>
                    <p className="text-zinc-400">No Projects found.</p>
                </div>}

                {projects.map((project) => (
                    <ProjectCard
                        _id={project._id}
                        title={project.title}
                        projectImage={project.projectImage}
                        category={project.category}
                        description={project.description}
                        techStack={project.techStack}
                        status={project.status}
                        githubLink={project.githubLink}
                        projectLink={project.projectLink}
                        user={project.user}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;
