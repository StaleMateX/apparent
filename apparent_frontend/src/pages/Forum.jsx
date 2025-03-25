import { useState, useEffect } from 'react';
import './Forum.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export function Forum({ onLogout }) {
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newCommentContent, setNewCommentContent] = useState('');
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    // close modal when clicking outside or pressing Escape
    const closeModal = () => setSelectedPost(null);

    useEffect(() => {
        fetchPosts();
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No token found.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/profile/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            //console.log("Response Status:", response.status); // Log response status
            const userData = await response.json();
            //console.log("Fetched User Data:", userData); // Log the fetched data

            if (response.ok && Array.isArray(userData) && userData.length > 0) {
                const user = userData[0];  // Extract the first object

                //console.log("Extracted User:", user); // Debugging log

                setCurrentUser({
                    username: user?.username || "N/A",
                    firstName: user?.first_name || "N/A",
                    lastName: user?.last_name || "N/A",
                });

                // console.log("Updated currentUser:", {
                //     username: user?.username,
                //     firstName: user?.first_name,
                //     lastName: user?.last_name,
                // });
            } else {
                console.error("User data is not in expected format:", userData);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

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
                onLogout();
                // Redirect to login page
                navigate('/login');
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

    // useEffect(() => {
    //     console.log("Current User:", currentUser?.username);
    //     posts.forEach((post) => {
    //         console.log("Post User:", post.user);
    //         post.comments.forEach((comment) => {
    //             console.log("Comment User:", comment.user);
    //         });
    //     });
    // }, [currentUser, posts]);


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
                {posts.slice().reverse().map((post) => (
                    <div key={post.id} className="post-container" onClick={() => setSelectedPost(post)}>
                        <div className="post-header">
                            <strong>{post.title}</strong> <span className="post-user"> by {post.user} </span>
                            {currentUser?.username === post.user && (
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeletePost(post.id);
                                }}>
                                    Delete Post
                                </button>
                            )}
                        </div>
                        <p className="post-content">{post.content}</p>
                    </div>
                ))}
            </div>

            {/* Modal for Viewing Post */}
            <Modal
                isOpen={!!selectedPost}
                onRequestClose={closeModal}
                className="modal-container"
                overlayClassName="modal-overlay"
            >
                {selectedPost && (
                    <div className="modal-content">
                        <button className="close-button" onClick={closeModal}>×</button>
                        <h2>{selectedPost.title}</h2>
                        <p>{selectedPost.content}</p>

                        <h3>Comments</h3>
                        {selectedPost.comments.map((comment) => (
                            <div key={comment.id} className="comment">
                                <strong>{comment.user}:</strong> {comment.content}
                                {currentUser?.username === comment.user && (
                                    <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                )}
                            </div>
                        ))}

                        {/* Add Comment */}
                        <textarea
                            value={newCommentContent}
                            onChange={(e) => setNewCommentContent(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <button onClick={() => handleCommentSubmit(selectedPost.id)}>Add Comment</button>

                        {currentUser?.username === selectedPost.user && (
                            <button className="delete-post-button" onClick={() => handleDeletePost(selectedPost.id)}>
                                Delete Post
                            </button>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
