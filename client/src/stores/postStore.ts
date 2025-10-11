import { create } from "zustand";
import type { postProp } from "../interfaces";
import axios from "axios";
import { BACKEND_URL } from "../utils";

type postStoreType = {
    posts: postProp[],
    fetchAllPost: () => Promise<void>
}


const usePostStore = create<postStoreType>((set) => ({
    posts: [],
    fetchAllPost: async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/post/all`, {
                withCredentials: true
            })
            set({ posts: response.data.posts })
        } catch (error) {
            console.error(error)
        }
    }
}))

export default usePostStore