export interface userProp {
    _id?: string
    fullName: string
    username: string,
    bannerImage?: string,
    profilePic?: string,
    headline?: string,
    bio?: string,
    address?: string,
    portfolioLink?: string,
    skills?: string[] | [],
    following?: string[],
    follower?: string[]
}

export interface postProp {
    _id: string,
    text: string,
    imageUrl: string,
    code: string,
    link: string,
    user: {
        _id: string,
        fullName: string,
        profilePic: string,
        username: string
    },
    likes: string[],
    comments: commentProp[]
}

export interface commentProp {
    _id?: string,
    post: postProp,
    text: string,
    user: userProp,
}

export interface projectProp {
    _id: string,
    title: string,
    description: string,
    projectImage: string,
    githubLink: string,
    projectLink: string,
    techStack: string[],
    status: string,
    category: string,
    user?: {
        _id: string,
        username: string,
        fullName: string,
        profilePic: string
    }
}