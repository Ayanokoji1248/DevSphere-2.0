export interface userProp {
    _id?: string
    fullName: string
    username: string,
    bannerImage?: string,
    profilePic?: string,
}

export interface postProp {
    _id?: string,
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
    likes: userProp[]
}