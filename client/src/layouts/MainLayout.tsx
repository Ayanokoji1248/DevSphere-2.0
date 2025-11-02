import { Link, Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import useUserStore from "../stores/userStore"
import usePostStore from "../stores/postStore"
import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import useProjectStore from "../stores/projectStore"
import { UserPlus } from "lucide-react"
import axios from "axios"
import { BACKEND_URL } from "../utils"

interface SuggestedUser {
    _id: string
    fullName: string
    username: string
    profilePic?: string
}

const MainLayout = () => {
    const { user, followUser } = useUserStore()
    const { fetchAllPost, posts } = usePostStore();
    const { projects, fetchProjects } = useProjectStore()

    const [users, setUsers] = useState<SuggestedUser[]>([])

    const suggestedUsers = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/suggested-user`, { withCredentials: true });
            console.log(response.data)
            setUsers(response.data.suggestedUsers)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        suggestedUsers()
    }, [])

    const handleFollow = (userId: string) => {
        setUsers((prev) => prev.filter((u) => u._id !== userId))
        followUser(userId)
    }

    useEffect(() => {
        fetchAllPost();
        fetchProjects()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="bg-zinc-950 relative w-full" id="main">
            <div className="w-full min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row max-w-7xl mx-auto relative" >
                {/* Sidebar */}
                <Sidebar />

                {/* Middle Section */}
                <div className="w-full md:w-[50%] min-h-[calc(100vh-80px)] md:min-h-screen mx-auto">
                    <NavBar />
                    <div className="mt-18 md:m-0">
                        <Outlet />
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="hidden md:flex flex-col justify-start items-start p-6 pt-8 w-[30%] min-h-screen border-l  border-zinc-600 gap-5 sticky top-0">
                    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col gap-4">
                        {/* Profile */}
                        <div className="flex flex-col items-center gap-2 mb-2">
                            <img
                                src={user?.profilePic}
                                alt="profile"
                                className="w-20 h-20 rounded-full object-cover border border-zinc-700"
                            />
                            <h2 className="text-white font-semibold text-lg">{user?.fullName}</h2>
                            <p className="text-sm leading-1 text-zinc-400">@{user?.username}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-around text-center border-t border-b border-zinc-700 py-3">
                            <div>
                                <p className="text-white font-medium">{user?.follower?.length}</p>
                                <p className="text-sm text-zinc-400">Followers</p>
                            </div>
                            <div>
                                <p className="text-white font-medium">{user?.following?.length}</p>
                                <p className="text-sm text-zinc-400">Following</p>
                            </div>
                            <div>
                                <p className="text-white font-medium">{posts.filter((post) => post.user._id === user?._id).length}</p>
                                <p className="text-sm text-zinc-400">Posts</p>
                            </div>
                            <div>
                                <p className="text-white font-medium">{projects.filter((project) => project.user?._id === user?._id).length}</p>
                                <p className="text-sm text-zinc-400">Projects</p>
                            </div>
                        </div>

                        {/* Optional Action */}
                        <Link to={`/user/${user?._id}`} className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md font-medium cursor-pointer flex justify-center items-center">
                            View Profile
                        </Link>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-2xl p-4 shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Suggested for you</h2>
                        <div className="space-y-5">
                            {users.slice(0, 5).map((user) => (
                                <div key={user._id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={user.profilePic || "/default-avatar.png"}
                                            alt={user.username}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-sm">{user.fullName}</p>
                                            <p className="text-xs text-gray-500">@{user.username}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleFollow(user._id)}
                                        className="flex items-center gap-1 bg-fuchsia-600 text-white px-3 py-1 rounded-md font-medium text-sm hover:bg-fuchsia-700 transition duration-300 cursor-pointer"
                                    >
                                        <UserPlus size={14} /> Follow
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout