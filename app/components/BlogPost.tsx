import React from 'react';

interface BlogPostProps {
    post: { id: number; title: string; content: string; likes: number };
    onLike: (id: number) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onLike }) => {
    return (
        <div className="mx-auto shadow-lg rounded-lg overflow-hidden my-4 shadow-sm">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex items-center justify-between">
                    <button 
                        onClick={() => onLike(post.id)} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Like
                    </button>
                    <span className="text-gray-500">{post.likes} Likes</span>
                </div>
            </div>
        </div>
    );
};

export default BlogPost; 