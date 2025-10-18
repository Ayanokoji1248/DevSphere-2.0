import { Link, Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import useUserStore from "../stores/userStore"
import usePostStore from "../stores/postStore"
import { useEffect } from "react"


const MainLayout = () => {
    const { user } = useUserStore()
    const { fetchAllPost, posts } = usePostStore();

    useEffect(() => {
        fetchAllPost()
    }, [])

    return (
        <div className="bg-zinc-950 relative w-full" id="main">
            <div className="w-full min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row max-w-7xl mx-auto relative" >
                {/* Sidebar */}
                <Sidebar />

                {/* Middle Section */}
                <div className="w-full md:w-[50%] min-h-[calc(100vh-80px)] md:min-h-screen mx-auto">
                    <Outlet />

                </div>

                {/* Right Sidebar */}
                <div className="hidden md:flex justify-center items-start p-6 w-[30%] h-screen border-l  border-zinc-600 sticky top-0">
                    <div className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 flex flex-col gap-4">
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
                                <p className="text-white font-medium">12</p>
                                <p className="text-sm text-zinc-400">Projects</p>
                            </div>
                        </div>

                        {/* Optional Action */}
                        <Link to={`/user/${user?._id}`} className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md font-medium cursor-pointer flex justify-center items-center">
                            View Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout