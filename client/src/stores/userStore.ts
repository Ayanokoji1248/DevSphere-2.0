import { create } from "zustand";
import type { userProp } from "../interfaces";

type userState = {
    user: userProp | null,
    setUser: (userData: userProp) => void
}

const useUserStore = create<userState>((set) => ({
    user: null,
    setUser: (userData) => {
        set({ user: userData })
    }
}))

export default useUserStore