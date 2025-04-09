import React, { useState, useEffect } from "react";
import apiClient from "../apiClient";
import Container from "react-bootstrap/Container";
import { UserProfilePage } from "./ProfilePages/UserProfilePage";

export function ProfilePage({
  firstName,
  lastName,
  friends,
  setFirstName,
  setLastName,
  setFriends,
  friendsProfile,
  setFriendsProfile,
}) {
  const [profileData, setProfileData] = useState(null || "");
  const [updatedProfile, setUpdatedProfile] = useState(false);
  const [updatedPosts, setUpdatedPosts] = useState("");
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [editButtonVisibility, setEditButtonVisibility] = useState(""); // Used to change edit button to "Add Friend" or no button
  const [viewRequestsLink, setViewRequestsLink] = useState(true);
  const [posts, setPosts] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const viewedProfile = localStorage.getItem("viewedProfile");
        setEditButtonVisibility("self");
        if (viewedProfile) {
          setFriendsProfile(viewedProfile);
        }
        let endpoint = "/profile/my_profile/";
        if (friendsProfile) {
          endpoint = `/profile/${friendsProfile}/`;
          const isFriend = profileData
            ? profileData.friends.filter(
                (friend) => profileData.username === friend.username
              )
            : "";
          if (isFriend) {
            setEditButtonVisibility("stranger");
          } else {
            setEditButtonVisibility("friend");
          }
          setViewRequestsLink(false);
        }
        const response = await apiClient("application/json").get(endpoint);
        setProfileData(response.data);
        setUpdatedPosts(true);
      } catch (err) {
        setError("Error fetching profile data");
        console.error("Error fetching profile data:", err);
      } finally {
        setIsLoading(false);
        setUpdatedProfile(false);
      }
    };

    fetchProfileData();
  }, [updatedProfile, friendsProfile]);

  useEffect(() => {
    const fetchProfileFeed = async () => {
      try {
        let username = localStorage.username;
        if (friendsProfile) {
          username = friendsProfile;
        }
        const response = await apiClient("application/json").get(
          `/posts/?username=${username}&ordering=-created_at`
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Error fetching profile feed");
        console.error("Error fetching profile feed:", err);
      } finally {
        setIsLoading(false);
        setUpdatedPosts(false);
      }
    };

    fetchProfileFeed();
  }, [updatedPosts]);

  useEffect(() => {
    if (profileData) {
      setFirstName(profileData.first_name || "");
      setLastName(profileData.last_name || "");
      setFriends(profileData.friends || []);
      setProfilePicture(profileData.profile_image || "../APParent_logo.png");
    }
  }, [profileData]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column align-items-center pt-4"
    >
      <UserProfilePage
        firstName={firstName}
        lastName={lastName}
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        profileData={profileData}
        setUpdatedProfile={setUpdatedProfile}
        friends={friends}
        setFriendsProfile={setFriendsProfile}
        setUpdatedPosts={setUpdatedPosts}
        updatedPosts={updatedPosts}
        posts={posts}
        editButtonVisibility={editButtonVisibility}
        setSuggestedFriends={setSuggestedFriends}
        suggestedFriends={suggestedFriends}
        viewRequestsLink={viewRequestsLink}
      />
    </Container>
  );
}
