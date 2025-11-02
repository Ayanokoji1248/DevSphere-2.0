import { Link } from 'react-router-dom'
import type { userProp } from '../interfaces'
import usePostStore from '../stores/postStore'
import useProjectStore from '../stores/projectStore';

const UserCard = (user: userProp) => {
    const { posts } = usePostStore();
    const { projects } = useProjectStore();
    return (
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
    )
}

export default UserCard