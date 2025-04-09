import "./PostSection.css";
import { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import apiClient from "../apiClient";

export function PostSection({
  firstName,
  lastName,
  userId,
  profilePicture,
  setUpdatedPosts,
  updatedPosts,
  posts,
}) {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("2");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const postCards = () => {
    if (Array.isArray(posts) && posts.length !== 0) {
      return posts.map((post) => (
        <PostCard
          key={post.id}
          firstName={firstName}
          lastName={lastName}
          profilePicture={profilePicture}
          title={post.title}
          createdAt={post.created_at}
          content={post.content}
        />
      ));
    }
    return "You have no posts.";
  };
  return (
    <>
      <ToggleButtonGroup
        type="radio"
        className="custom-button-toolbar mb-3"
        aria-label="Toolbar with a button group"
        name="profile tabs"
      >
        <ToggleButtonGroup
          className="custom-button-group me-3"
          aria-label="First group"
          defaultValue={2}
        >
          <ToggleButton
            className="custom-button first"
            id="tbg-radio-1"
            value={1}
          >
            Profile Feed
          </ToggleButton>
          <ToggleButton className="custom-button" id="tbg-radio-2" value={2}>
            Your Posts
          </ToggleButton>
          <ToggleButton className="custom-button" id="tbg-radio-3" value={3}>
            Favorites
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup className="ms-auto" aria-label="Second group">
          <ToggleButton
            className="custom-button last"
            id="tbg-radio-4"
            value={4}
          >
            Post Something{/* Start here! Trying to render existing posts. */}
          </ToggleButton>
        </ToggleButtonGroup>
      </ToggleButtonGroup>
      {postCards()}
    </>
  );
}
