import { useState, useEffect } from 'react';
import './Forum.css';

export function Forum() {
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No authentication token found. Please log in.');
            return; // Stop execution if token is missing
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/forum/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                console.error('Unauthorized: Token may be invalid or expired.');
                // Optionally redirect the user to the login page
                return;
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handlePostSubmit = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/forum/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title: newPostTitle, content: newPostContent }),
        });
        if (response.ok) {
            fetchPosts();
            setNewPostTitle('');
            setNewPostContent('');
        }
    };

    const handleDeletePost = async (postId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/forum/${postId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                fetchPosts();
            } else {
                console.error('Error deleting post:', await response.json());
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleCommentSubmit = async (postId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ post: postId, content: newCommentContent }),
            });
            if (response.ok) {
                fetchPosts(); // Refresh posts to include the new comment
                setNewCommentContent('');
            } else {
                console.error('Error adding comment:', await response.json());
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/comments/${commentId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                fetchPosts();
            } else {
                console.error('Error deleting comment:', await response.json());
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
            <div className="forum-container">
            <h1>Forum</h1>
            <div className="submit-section">
                <input
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Post Title"
                />
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your content here..."
                />
                <button onClick={handlePostSubmit}>Submit</button>
            </div>
            <h2>Posts</h2>
            <div>
                {posts.map((post) => (
                    <div key={post.id} className="post-container">
                        <div className="post-header">
                            <strong>{post.title}</strong> <span className="post-user"> by {post.user} </span>
                            <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                        </div>
                        <p className="post-content">{post.content}</p>
                        <h3>Comments</h3>
                        <div className="comment-container">
                            {post.comments.map((comment) => (
                                <div key={comment.id} className="comment">
                                    <strong>{comment.user}:</strong> <span className="comment-content">{comment.content}</span>
                                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                </div>
                            ))}
                            <div className="comment-form">
                                <textarea
                                    value={newCommentContent}
                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                    placeholder="Write a comment..."
                                />
                                <button onClick={() => handleCommentSubmit(post.id)}>Add Comment</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
