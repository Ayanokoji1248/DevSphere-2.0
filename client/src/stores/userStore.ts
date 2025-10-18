import { create } from "zustand";
import type { userProp } from "../interfaces";
import axios from "axios";
import { BACKEND_URL } from "../utils";

type userState = {
    user: userProp | null,
    setUser: (userData: userProp) => void,
    clearUser: () => void,
    followUser: (userId: string) => Promise<void>,
    unfollowUser: (userId: string) => Promise<void>,
}

const useUserStore = create<userState>((set, get) => ({
    user: null,
    setUser: (userData) => {
        set({ user: userData })
    },
    clearUser: () => {
        set({ user: null })
    },
    followUser: async (userId) => {
        const { user } = get();
        if (!user) return;

        set({
            user: {
                ...user,
                following: [...user.following || [], userId]
            }
        })

        try {
            await axios.put(`${BACKEND_URL}/user/follow/${userId}`, {}, { withCredentials: true })
        } catch (error) {
            console.error(error);

            set({
                user: {
                    ...user,
                    following: user.following?.filter((id) => id !== userId)
                }
            })

        }
    },
    unfollowUser: async (userId) => {
        const { user } = get();

        if (!user) return;

        set({
            user: {
                ...user,
                following: user.following?.filter(id => id !== userId) || []
            }
        })

        try {
            await axios.put(`${BACKEND_URL}/user/unfollow/${userId}`, {}, {
                withCredentials: true
            })
        } catch (error) {
            console.error(error)
            set({
                user: {
                    ...user,
                    following: [...user.following || [], userId]
                }
            })
        }

    },
}))

export default useUserStore