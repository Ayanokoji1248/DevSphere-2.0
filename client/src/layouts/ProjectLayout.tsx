
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import NavBar from "../components/NavBar"


const ProjectLayout = () => {
    return (
        <div className="bg-zinc-950 relative w-full" id="project">
            <div className="w-full min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row max-w-7xl mx-auto relative" >
                {/* Sidebar */}
                <Sidebar />

                {/* Middle Section */}
                <div className="w-full md:w-[80%] min-h-[calc(100vh-80px)] md:min-h-screen mx-auto">
                    <NavBar />
                    <div className="mt-18 md:m-0">
                        <Outlet />
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ProjectLayout