import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import useUserStore from "../stores/userStore"


const MainLayout = () => {
    const { user } = useUserStore()

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
                                src="https://i.pinimg.com/1200x/00/80/fc/0080fcbb036ac608f882c656509ea355.jpg"
                                alt="profile"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <h2 className="text-white font-semibold text-lg">{user?.fullName}</h2>
                            <p className="text-sm leading-1 text-zinc-400">@{user?.username}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-around text-center border-t border-b border-zinc-700 py-3">
                            <div>
                                <p className="text-white font-medium">120</p>
                                <p className="text-sm text-zinc-400">Followers</p>
                            </div>
                            <div>
                                <p className="text-white font-medium">80</p>
                                <p className="text-sm text-zinc-400">Following</p>
                            </div>
                            <div>
                                <p className="text-white font-medium">34</p>
                                <p className="text-sm text-zinc-400">Posts</p>
                            </div>
                            <div>
                                <p className="text-white font-medium">12</p>
                                <p className="text-sm text-zinc-400">Projects</p>
                            </div>
                        </div>

                        {/* Optional Action */}
                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md font-medium cursor-pointer">
                            View Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout