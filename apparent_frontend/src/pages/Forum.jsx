
// src/pages/Forum.jsx
import { useState } from 'react';

export function Forum() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/forum/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newPost }),
        });
        const post = await response.json();
        setPosts([...posts, post]);
        setNewPost('');
    };

    const fetchPosts = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/forum/');
        const data = await response.json();
        setPosts(data);
    };

    return (
        <div>
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
                        <li key={post.id}>{post.content}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

