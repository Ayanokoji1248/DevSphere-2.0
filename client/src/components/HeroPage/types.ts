import React from 'react';

export interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
    preview?: React.ReactNode;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    progress: number; // 0 to 100
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    stars: number;
    forks: number;
    lastUpdated: string;
    user: User; // The creator
}

export interface User {
    name: string;
    handle: string;
    avatar: string;
    banner?: string;
    bio: string;
    location?: string;
    website?: string;
    joinDate?: string;
    followers: number;
    following: number;
    projects: number;
}

export interface Post {
    id: string;
    user: User;
    content: string;
    codeSnippet?: {
        language: string;
        code: string;
    };
    image?: string;
    projectLink?: {
        title: string;
        url: string;
    };
    likes: number;
    comments: number;
    shares: number;
    timestamp: string;
    isProjectShowcase?: boolean;
    tags?: string[];
}