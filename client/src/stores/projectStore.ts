import { create } from "zustand";
import type { projectProp } from "../interfaces";
import axios from "axios";
import { BACKEND_URL } from "../utils";

type projectStoreType = {
    projects: projectProp[],
    fetchProjects: () => Promise<void>,
    addProject: (title: string, description: string, techStack: string[], status: string, category: string, githubLink: string, projectLink: string, projectImage: string) => Promise<void>,
    deleteProject: (projectId: string) => void
}

const useProjectStore = create<projectStoreType>((set) => ({
    projects: [],
    fetchProjects: async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/project/all`, { withCredentials: true });
            set({ projects: response.data.projects });
        } catch (error) {
            console.error(error);
        }
    },
    addProject: async (title, description, techStack, status, category, githubLink, projectLink, projectImage) => {

        try {
            const response = await axios.post(`${BACKEND_URL}/project/create`, {
                title,
                projectImage,
                description,
                techStack,
                status,
                category,
                githubLink,
                projectLink,
            }, {
                withCredentials: true
            })
            console.log(response.data)
            const newProject = response.data.project
            set((state) => ({
                projects: [...state.projects, newProject]
            }))
        } catch (error) {
            console.error(error)
        }


    },
    deleteProject: async (projectId) => {
        try {
            await axios.delete(`${BACKEND_URL}/project/${projectId}`, { withCredentials: true });

            set((state) => ({
                projects: state.projects.filter(project => project._id !== projectId)
            }))
        } catch (error) {
            console.error(error);
        }
    }
}))

export default useProjectStore