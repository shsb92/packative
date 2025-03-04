'use client'

import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost';

const BlogList: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await fetch('/api/posts');
        if (response.ok) {
            const data = await response.json();
            setPosts(data);
        } else {
            console.error('Failed to fetch posts');
        }
    };

    const createPost = async () => {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            fetchPosts();
            setTitle('');
            setContent('');
        } else {
            console.error('Failed to create post');
        }
    };

    const likePost = async (id: number) => {
        const response = await fetch(`/api/posts/${id}/like`, {
            method: 'PATCH',
        });

        if (response.ok) {
            fetchPosts();
        } else {
            console.error('Failed to like post');
        }
    };

    return (
        <div className="max-w-2xl mx-auto ">
            <div className="p-4 overflow-y-auto h-[calc(100dvh-300px)]">
                {posts.map((post) => (
                    <BlogPost key={post.id} post={post} onLike={likePost} />
                ))}
            </div>
            <div className="bottom-0 left-0 right-0 bg-white shadow-md p-4">
                <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        onClick={createPost}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Create Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogList; 