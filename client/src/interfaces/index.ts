export interface userProp {
    _id?: string
    fullName: string
    username: string,
    bannerImage?: string,
    profilePic?: string,
    heading?: string,
    bio?: string,
    address?: string,
    portfolioLink?: string,
    skills?: string[] | [],
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
    likes: userProp[],
    comments: commentProp[]
}

export interface commentProp {
    _id?: string,
    post: postProp,
    text: string,
    user: userProp,
}