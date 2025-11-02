import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils";
import { type userProp } from "../interfaces";
import { MessageSquare, Search } from "lucide-react";

const MessagePage = () => {
    const [userFollowingList, setUserFollowingList] = useState<userProp[]>([]);
    const [selectedUser, setSelectedUser] = useState<userProp | null>(null);
    const [search, setSearch] = useState("");

    const getUserFollowing = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/following`, {
                withCredentials: true,
            });
            setUserFollowingList(response.data.userFollowing);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserFollowing();
    }, []);

    // filter users by search
    const filteredUsers = userFollowingList.filter((u) =>
        u.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full min-h-screen flex text-white bg-zinc-950">
            {/* Left Panel – User List */}
            <div className="w-full md:w-[35%] border-r border-zinc-800 flex flex-col">
                <div className="p-4 border-b border-zinc-800">
                    <h1 className="text-xl font-semibold">Messages</h1>
                </div>

                {/* Search Bar */}
                <div className="p-3 border-b border-zinc-800">
                    <div className="flex items-center bg-zinc-900 rounded-xl px-3 py-2 gap-2">
                        <Search size={18} className="text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search people"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent outline-none w-full text-sm text-zinc-300"
                        />
                    </div>
                </div>

                {/* Following List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.length === 0 ? (
                        <div className="text-zinc-500 text-center mt-10">
                            No users found
                        </div>
                    ) : (
                        filteredUsers.map((user) => (
                            <div
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className={`flex items-center gap-3 p-3 px-6 cursor-pointer hover:bg-zinc-900 transition ${selectedUser?._id === user._id ? "bg-zinc-900" : ""
                                    }`}
                            >
                                <img
                                    src={user.profilePic || "/default-avatar.png"}
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-medium capitalize">{user.username}</p>
                                    <p className="text-sm text-zinc-500">@{user.username}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Panel – Chat Section */}
            <div className="hidden md:flex flex-col w-[65%]">
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="flex items-center gap-3 p-4 border-b border-zinc-800 bg-zinc-950">
                            <img
                                src={selectedUser.profilePic || "/default-avatar.png"}
                                alt={selectedUser.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-medium">{selectedUser.username}</p>
                                <p className="text-sm text-zinc-500">@{selectedUser.username}</p>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto flex flex-col justify-end p-4">
                            <div className="text-center text-zinc-500 text-sm mb-3">
                                No messages yet
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="p-3 border-t border-zinc-800 flex items-center gap-3">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full bg-zinc-900 text-white rounded-xl px-4 py-2 outline-none"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium">
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    // Default Empty State
                    <div className="flex flex-col items-center justify-center flex-1 text-zinc-500">
                        <MessageSquare size={48} className="mb-4 text-zinc-600" />
                        <h2 className="text-xl font-semibold mb-1">Your messages</h2>
                        <p className="text-sm text-zinc-400">
                            Send a message to start a conversation.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagePage;
