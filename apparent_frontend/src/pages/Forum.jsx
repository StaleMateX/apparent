import { useState, useEffect } from "react";
import "./Forum.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useRef } from "react";

export function Forum({ onLogout }) {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [postTitles, setPostTitles] = useState([]); // Store existing post titles
  const [suggestions, setSuggestions] = useState([]); // Store matched suggestions
  const suggestionBoxRef = useRef(null);

  // When user clicks delete, show confirmation modal
  const openConfirmDelete = (type, id) => {
    setDeleteType(type);
    setConfirmDelete(id);
  };

  // When user cancels, close confirmation modal
  const closeConfirmDelete = () => {
    setDeleteType(null);
    setConfirmDelete(null);
  };

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
        const user = userData[0]; // Extract the first object

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
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found. Please log in.");
      return; // Stop execution if token is missing
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        console.error("Unauthorized: Token may be invalid or expired.");
        onLogout();
        // Redirect to login page
        navigate("/login");
        return;
      }

      const data = await response.json();
      setPosts(data);
      setPostTitles(data.map((post) => ({ id: post.id, title: post.title })));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const stopWords = new Set([
    "for",
    "with",
    "on",
    "the",
    "to",
    "and",
    "of",
    "in",
    "at",
    "is",
    "a",
    "an",
  ]); // Common words to ignore

  const findSuggestions = (input) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    const inputWords = input
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.has(word)); // Ignore short/common words

    if (inputWords.length === 0) {
      setSuggestions([]);
      return;
    }

    const matchedTitles = postTitles.filter((post) =>
      inputWords.some((word) => post.title.toLowerCase().includes(word))
    );

    setSuggestions(matchedTitles);
  };
  // Function to handle clicks outside of the suggestions dropdown
  const handleClickOutside = (event) => {
    if (
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target)
    ) {
      setSuggestions([]); // Hide suggestions if clicking outside
    }
  };

  // Add event listener to detect clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // When selecting a suggestion, hide the dropdown and set the post
  const handleSuggestionClick = (post) => {
    const fullPost = posts.find((p) => p.id === post.id); // Find the full post object
    if (fullPost) {
      setSelectedPost(fullPost);
    }
    setSuggestions([]); // Hide suggestions
  };

  const handlePostSubmit = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newPostTitle, content: newPostContent }),
    });
    if (response.ok) {
      fetchPosts();
      setNewPostTitle("");
      setNewPostContent("");
    }
  };

  const handleCommentSubmit = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post: postId, content: newCommentContent }),
      });
      if (response.ok) {
        const newComment = await response.json(); // Get the newly created comment from the response
        setSelectedPost((prevPost) => ({
          ...prevPost,
          comments: [...prevPost.comments, newComment],
        }));
        setNewCommentContent(""); // Clear the input
      } else {
        console.error("Error adding comment:", await response.json());
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete || !deleteType) return;

    const token = localStorage.getItem("token");
    const url =
      deleteType === "post"
        ? `http://127.0.0.1:8000/api/posts/${confirmDelete}/`
        : `http://127.0.0.1:8000/api/comments/${confirmDelete}/`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        if (deleteType === "post") {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== confirmDelete)
          );
          setSelectedPost(null); // Close modal if deleting a post
        } else {
          setSelectedPost((prevPost) => ({
            ...prevPost,
            comments: prevPost.comments.filter(
              (comment) => comment.id !== confirmDelete
            ),
          }));
        }
      } else {
        console.error("Error deleting:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }

    // Close confirmation modal after deletion
    closeConfirmDelete();
  };

  return (
    <div className="forum-container">
      <h1>Forum</h1>
      <div className="submit-section">
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => {
            setNewPostTitle(e.target.value);
            findSuggestions(e.target.value);
          }}
          onFocus={(e) => {
            findSuggestions(e.target.value); // Recalculate suggestions on focus
          }}
          placeholder="Post Title"
        />
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown" ref={suggestionBoxRef}>
            {suggestions.map((post) => (
              <div
                key={post.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(post)}
              >
                {post.title}
              </div>
            ))}
          </div>
        )}
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write your content here..."
        />
        <button onClick={handlePostSubmit}>Submit</button>
      </div>

      <h2>Posts</h2>
      <div>
        {posts
          .slice()
          .reverse()
          .map((post) => (
            <div
              key={post.id}
              className="post-container"
              onClick={() => setSelectedPost(post)}
            >
              <div className="post-header">
                <strong>{post.title}</strong>
                <span
                  className={`post-user ${
                    currentUser?.username === post.user ? "current-user" : ""
                  }`}
                >
                  by {post.user}
                </span>
                {/*{currentUser?.username === post.user && (*/}
                {/*    // <button onClick={(e) => {*/}
                {/*    //     e.stopPropagation();*/}
                {/*    //     handleDeletePost(post.id);*/}
                {/*    // }}>*/}
                {/*    <button*/}
                {/*        className="delete-post-button"*/}
                {/*        onClick={() => openConfirmDelete('post', selectedPost.id)}*/}
                {/*    >*/}
                {/*        Delete Post*/}
                {/*    </button>*/}
                {/*)}*/}
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
          <div>
            <div className="modal-header">
              <h2>{selectedPost.title}</h2>
              <button className="close-button" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-content">
              <p>{selectedPost.content}</p>

              <h3>Comments</h3>
              {selectedPost.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <strong
                    className={
                      currentUser?.username === comment.user
                        ? "current-user"
                        : "comment-user"
                    }
                  >
                    {comment.user}:
                  </strong>
                  {comment.content}
                  {currentUser?.username === comment.user && (
                    <button
                      onClick={() => openConfirmDelete("comment", comment.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}

              {/* Add Comment */}
              <textarea
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={() => handleCommentSubmit(selectedPost.id)}>
                Add Comment
              </button>

              {currentUser?.username === selectedPost.user && (
                // <button className="delete-post-button" onClick={() => handleDeletePost(selectedPost.id)}>
                <button
                  className="delete-post-button"
                  onClick={() => openConfirmDelete("post", selectedPost.id)}
                >
                  Delete Post
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={!!confirmDelete}
        onRequestClose={closeConfirmDelete}
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this {deleteType}?</p>
          <div className="modal-buttons">
            <button onClick={handleConfirmDelete} className="confirm-button">
              Yes
            </button>
            <button onClick={closeConfirmDelete} className="cancel-button">
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
