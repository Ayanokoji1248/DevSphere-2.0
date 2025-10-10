import axios from "axios";
import { create } from "zustand";
import { BACKEND_URL } from "../utils";
import useUserStore from "./userStore";

type authState = {
    isAuthenticated: boolean,
    login: (email: string, password: string) => Promise<void>
    register: (fullName: string, username: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}


const useAuthStore = create<authState>((set) => ({
    isAuthenticated: false,
    login: async (email, password) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                email,
                password
            }, { withCredentials: true });

            console.log(response.data)
            useUserStore.getState().setUser(response.data.user);
            set({ isAuthenticated: true })

        } catch (error) {
            console.error(error);
        }
    },
    register: async (fullName, username, email, password) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                fullName,
                username,
                email,
                password
            }, { withCredentials: true });

            console.log(response.data)
            useUserStore.getState().setUser(response.data.user);
            set({ isAuthenticated: true })

        } catch (error) {
            console.error(error);
        }
    },
    logout: async () => {
        try {
            await axios.post(`${BACKEND_URL}/auth/logout`, {}, {
                withCredentials: true
            })
            set({ isAuthenticated: false })
        } catch (error) {
            console.error(error)
        }
    },
}))

export default useAuthStore