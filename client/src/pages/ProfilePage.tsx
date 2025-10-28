import { useEffect, useState } from "react";
import { CodeXml, Link, MapPin, Plus } from "lucide-react";
import EditProfileModal from "../components/EditProfileModal";
import usePostStore from "../stores/postStore";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { type userProp } from "../interfaces";
import useUserStore from "../stores/userStore";
import useProjectStore from "../stores/projectStore";
import ProjectCard from "../components/ProjectCard";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("Posts");

    const [modal, setModal] = useState(false)

    const { id } = useParams()
    const [userProfile, setUserProfile] = useState<userProp>();
    const { user, followUser, unfollowUser } = useUserStore();
    const alreadyFollow = id && user?.following?.includes(id)

    const { posts } = usePostStore();
    const { projects, fetchProjects } = useProjectStore()

    const userPost = posts.filter((post) => post?.user?._id === userProfile?._id).length

    const userProject = projects.filter((project) => project.user?._id === userProfile?._id)

    useEffect(() => {

        const fetchProjectIfEmpty = async () => {
            if (projects.length === 0) {
                try {
                    await fetchProjects()
                } catch (error) {
                    console.error(error)
                }
            }
        }

        const getUserProfile = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/user/${id}`, { withCredentials: true })
                setUserProfile(response.data.user)
            } catch (error) {
                console.log(error)
            }
        }
        getUserProfile();
        fetchProjectIfEmpty()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, projects])

    useEffect(() => {
        if (id === user?._id && user) {
            setUserProfile(user);
        }
    }, [user, id]);


    return (
        <div className="min-h-screen bg-zinc-950 text-white">

            {modal && <EditProfileModal setModal={setModal} />}


            {/* Cover */}
            <div className="h-48 md:h-64 w-full relative">
                <img
                    src={userProfile?.bannerImage}
                    alt="banner"
                    className="w-full h-full object-cover"
                />
                {/* Profile Image */}
                <div className="absolute bottom-[-50px] left-6 w-28 h-28 md:w-32 md:h-32 border-2 border-zinc-700 rounded-full overflow-hidden">
                    <img
                        src={userProfile?.profilePic}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="px-6 mt-16 md:mt-15">
                {/* Name + Headline */}
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            {userProfile?.fullName}
                        </h1>
                        <p className="text-zinc-500 text-sm">@{userProfile?.username}</p>
                    </div>
                    {userProfile?._id === user?._id &&
                        <button onClick={() => {
                            setModal(!modal)
                        }} className="bg-black hover:bg-zinc-900 border border-zinc-600 px-4 py-2 rounded-full text-sm font-medium transition duration-300 cursor-pointer">
                            Edit Profile
                        </button>
                    }
                    {
                        userProfile?._id !== user?._id &&
                        <button onClick={() => alreadyFollow ? unfollowUser(id) : followUser(id as string)} className={`${alreadyFollow ? "border border-fuchsia-600" : "bg-fuchsia-600"} p-2 py-1 rounded-md text-sm font-medium cursor-pointer hover:bg-fuchsia-700 transition-all duration-300`}>{alreadyFollow ? "Unfollow" : "Follow"}</button>
                    }
                </div>

                {/* Headline */}
                {userProfile?.headline &&
                    <p className="mt-2 bg-violet-900/40 px-2 py-1 rounded-full text-xs w-fit text-violet-300 font-medium">
                        {userProfile?.headline}
                    </p>
                }

                {/* Bio */}
                {userProfile?.bio &&
                    <p className="mt-3 text-sm text-zinc-300 leading-tight">{userProfile.bio}</p>
                }

                {/* Location + Portfolio */}
                {userProfile?.address && userProfile.portfolioLink &&
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-zinc-400">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-blue-400" />
                            <span>{userProfile.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link size={16} className="text-emerald-400" />
                            <a
                                href={userProfile.portfolioLink}
                                className="text-blue-400 hover:underline break-all"
                                target="_blank"
                            >
                                {userProfile.portfolioLink}
                            </a>
                        </div>
                    </div>
                }

                {/* Stats */}
                <div className="flex flex-wrap justify-around mt-5 border-t border-b border-zinc-800 py-3">
                    <div className="text-center">
                        <h2 className="font-bold text-xl">{userProfile?.following?.length}</h2>
                        <p className="text-sm text-zinc-400">Following</p>
                    </div>
                    <div className="text-center">
                        <h2 className="font-bold text-xl">{userProfile?.follower?.length}</h2>
                        <p className="text-sm text-zinc-400">Followers</p>
                    </div>
                    <div className="text-center">
                        <h2 className="font-bold text-xl">{posts.filter((post) => post.user._id === userProfile?._id).length}</h2>
                        <p className="text-sm text-zinc-400">Posts</p>
                    </div>
                    <div className="text-center">
                        <h2 className="font-bold text-xl">{userProject.length}</h2>
                        <p className="text-sm text-zinc-400">Projects</p>
                    </div>
                </div>

                {/* Skills */}
                <div className="mt-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <CodeXml className="text-blue-400" size={20} />
                            <h2 className="font-semibold text-lg">Skills & Technologies</h2>
                        </div>
                        {userProfile?._id === user?._id &&
                            <button onClick={() => {
                                setModal(true)
                            }} className="flex items-center gap-2 text-sm font-medium border border-zinc-700 px-2 py-1 rounded-md hover:bg-zinc-900 transition duration-300 cursor-pointer">
                                <Plus size={16} /> Add Skill
                            </button>
                        }
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {userProfile?.skills?.map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-900/60 text-blue-400 text-sm rounded-full font-medium"
                            >
                                {skill}
                            </span>
                        ))}

                        {(userProfile?.skills?.length == 0 || !userProfile?.skills) && <p className="text-zinc-700 text-sm font-medium ">No skills added yet.</p>}

                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-evenly mt-6 border-b border-zinc-800">
                    {["Posts", "Projects"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 p-2 font-medium text-sm ${activeTab === tab
                                ? "border-b-2 border-violet-500 text-white"
                                : "text-zinc-400 hover:text-white"
                                } transition`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-5 pb-5 flex flex-col">
                    {activeTab === "Posts" && (
                        userPost > 0 ? (
                            posts
                                .filter((post) => post?.user?._id === userProfile?._id)
                                .map((post) => (
                                    <PostCard
                                        key={post._id}
                                        _id={post._id}
                                        text={post.text}
                                        code={post.code}
                                        link={post.link}
                                        imageUrl={post.imageUrl}
                                        user={post.user}
                                        likes={post.likes}
                                        comments={post.comments}
                                    />
                                ))
                        ) : (
                            <p className="text-sm text-center font-medium text-zinc-600">No post yet.</p>
                        )
                    )}

                    {activeTab === "Projects" && (
                        userProject.length > 0 ? (
                            userProject.map((project) => (
                                <ProjectCard
                                    key={project._id}
                                    _id={project._id}
                                    title={project.title}
                                    description={project.description}
                                    projectImage={project.projectImage}
                                    githubLink={project.githubLink}
                                    projectLink={project.projectLink}
                                    status={project.status}
                                    category={project.category}
                                    user={project.user}
                                    techStack={project.techStack}
                                />
                            ))
                        ) : (
                            <p className="text-zinc-500 font-medium text-sm text-center">No Projects yet.</p>
                        )
                    )}
                </div>

            </div>
        </div >

    );
};

export default ProfilePage;
