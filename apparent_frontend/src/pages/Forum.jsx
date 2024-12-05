// src/pages/Forum.jsx
import { useState, useEffect } from 'react';
import './Forum.css';

export function Forum() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    // Fetch posts when the component loads
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/forum/');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/forum/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newPost }),
            });
            const post = await response.json();
            setPosts([...posts, post]);
            setNewPost('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/forum/${postId}/`, {
                method: 'DELETE',
            });
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="forum-container">
            <h1>Forum</h1>
            <div>
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Write a new post"
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                <h2>Posts</h2>
                <button onClick={fetchPosts}>Refresh Posts</button>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} className="post-item">
                            <span>{post.content}</span>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(post.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
