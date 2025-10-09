import { Code, Ellipsis, FolderCode, Globe, HomeIcon, Search, User } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="w-full md:w-[20%] h-screen border-b md:border-b-0 md:border-r border-zinc-600 flex flex-col justify-between items-center px-2 py-4 md:py-6 xl:sticky top-0">

            <div className="flex flex-col justify-center gap-10 px-4 w-full">
                <div className="flex items-center gap-3">
                    <Globe size={32} className="text-white" />
                    <div>
                        <h1 className="text-white font-bold font-[Albert_Sans] text-xl md:text-2xl">
                            DevSphere
                        </h1>
                        <p className="text-xs text-zinc-100 font-medium">
                            Connect • Code • Create
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 w-full">

                    <div className="">
                        <div className="flex items-center justify-start p-3 px-5 gap-5 hover:bg-zinc-900 rounded-full transition-all duration-300 cursor-pointer w-fit">
                            <HomeIcon />
                            <h2 className="text-xl font-semibold">Home</h2>
                        </div>
                    </div>

                    <div className="">
                        <div className="flex items-center justify-start p-3 px-5 gap-5 hover:bg-zinc-900 rounded-full transition-all duration-300 cursor-pointer w-fit">
                            <Search />
                            <h2 className="text-xl font-semibold">Explore</h2>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex items-center justify-start p-3 px-5 gap-5 hover:bg-zinc-900 w-fit rounded-full transition-all duration-300 cursor-pointer">
                            <FolderCode />
                            <h2 className="text-xl font-semibold">Projects</h2>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex items-center justify-start p-3 px-5 gap-5 hover:bg-zinc-900 w-fit rounded-full transition-all duration-300 cursor-pointer">
                            <Code />
                            <h2 className="text-xl font-semibold">Code Review</h2>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex items-center justify-start p-3 px-5 gap-5 hover:bg-zinc-900 w-fit rounded-full transition-all duration-300 cursor-pointer">
                            <User />
                            <h2 className="text-xl font-semibold">Profile</h2>
                        </div>
                    </div>

                    <div className="w-full">
                        <button className="w-full p-3 bg-violet-600 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-violet-700 cursor-pointer mt-3">Post</button>
                    </div>

                </div>
            </div>

            <div className="w-full p-3 hover:bg-zinc-900 rounded-full cursor-pointer transition-all duration-300 flex justify-between items-center">
                <div className="flex items-center gap-3">

                    <img className="w-12 h-12 rounded-full" src="https://i.pinimg.com/1200x/00/80/fc/0080fcbb036ac608f882c656509ea355.jpg" alt="" />
                    <div className="flex flex-col">
                        <h1 className="font-semibold">Krish Prajapati</h1>
                        <p className="text-sm text-zinc-600 font-medium">@crish</p>
                    </div>
                </div>
                <div>
                    <Ellipsis size={20} />
                </div>
            </div>
        </div>
    )
}

export default Sidebar