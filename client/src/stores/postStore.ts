import { create } from "zustand";
import type { postProp } from "../interfaces";
import axios from "axios";
import { BACKEND_URL } from "../utils";

type postStoreType = {
    posts: postProp[],
    fetchAllPost: () => Promise<void>,
    addPost: (text: string) => Promise<void>
    deletePost: (postId: string) => Promise<void>
}


const usePostStore = create<postStoreType>((set) => ({
    posts: [],
    fetchAllPost: async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/post/all`, {
                withCredentials: true
            })
            set({ posts: response.data.posts.reverse() })
        } catch (error) {
            console.error(error)
        }
    },
    addPost: async (text) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/post/create`, { text: text }, {
                withCredentials: true
            })

            const newPost = response.data.post;

            set((state) => ({ posts: [newPost, ...state.posts] }))

        } catch (error) {
            console.error(error)
        }
    },
    deletePost: async (postId) => {
        try {
            await axios.delete(`${BACKEND_URL}/post/${postId}`, { withCredentials: true });

            set((state) => ({ posts: state.posts.filter((post) => post._id !== postId) }))

        } catch (error) {
            console.error(error)
        }
    }
}))

export default usePostStore