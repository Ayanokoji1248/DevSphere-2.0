import { create } from "zustand";
import type { projectProp } from "../interfaces";
import axios from "axios";
import { BACKEND_URL } from "../utils";

type projectStoreType = {
    projects: projectProp[],
    addProject: (title: string, description: string, techStack: string[], status: string, category: string, githubLink: string, projectLink: string) => Promise<void>,
    deleteProject: (projectId: string) => void
}

const useProjectStore = create<projectStoreType>((set) => ({
    projects: [],
    addProject: async (title, description, techStack, status, category, githubLink, projectLink) => {

        try {
            const response = await axios.post(`${BACKEND_URL}/project/create`, {
                title,
                description,
                techStack,
                status,
                category,
                githubLink,
                projectLink
            }, {
                withCredentials: true
            })
            const newProject = response.data.project
            set((state) => ({
                projects: [...state.projects, newProject]
            }))
        } catch (error) {
            console.error(error)
        }


    },
    deleteProject: (projectid) => {

    }
}))

export default useProjectStore