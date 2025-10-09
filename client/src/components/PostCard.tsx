import { Ellipsis, Heart, MessageCircle } from "lucide-react"

const PostCard = () => {
    return (
        <div className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-700 p-4 flex flex-col gap-3">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <img
                        className="w-12 h-12 rounded-full object-cover"
                        src="https://i.pinimg.com/1200x/00/80/fc/0080fcbb036ac608f882c656509ea355.jpg"
                        alt="profile"
                    />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="font-medium">Krish Prajapati</h1>
                            <p className="text-sm text-zinc-500 leading-0">@crish1248</p>
                        </div>
                    </div>
                </div>
                <div className="hover:bg-zinc-900 transition-all duration-300 p-2 rounded-full ">
                    <Ellipsis className="text-zinc-400 cursor-pointer" />
                </div>
            </div>

            {/* Post Text */}
            <div className="text-sm text-white">
                Just finished working on my new project! 🚀 #WebDevelopment #React
            </div>

            {/* Post Image */}
            <div className="w-full h-60 bg-zinc-800 rounded-xl overflow-hidden">
                <img
                    src="https://i.pinimg.com/originals/00/80/fc/0080fcbb036ac608f882c656509ea355.jpg"
                    alt="post"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-wrap gap-3">
                <span className="text-sm font-medium bg-zinc-800 px-2 py-1 rounded-md text-zinc-300"># React</span>
                <span className="text-sm font-medium bg-zinc-800 px-2 py-1 rounded-md text-zinc-300"># React</span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap sm:flex-nowrap gap-4 text-zinc-400 mt-2">
                <div className="flex items-center gap-2 cursor-pointer hover:text-red-500">
                    <Heart size={18} />
                    <span className="text-sm">45</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
                    <MessageCircle size={18} />
                    <span className="text-sm">12</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard