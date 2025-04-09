import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import { UserProfileInfo } from "../../components/UserProfileInfo";
import { PostSection } from "../../components/PostSection";
import { FriendsListOverlay } from "../../components/Extras/FriendsListOverlay";
import { SuggestedFriendsCarousel } from "../../components/Extras/SuggestedFriendsCarousel";
import apiClient from "../../apiClient";

export function UserProfilePage({
  firstName,
  lastName,
  profilePicture,
  setProfilePicture,
  profileData,
  setProfileData,
  setUpdatedProfile,
  friends,
  setFriendsProfile,
  setUpdatedPosts,
  updatedPosts,
  posts,
  editButtonVisibility,
  setSuggestedFriends,
  suggestedFriends,
}) {
  const navigate = useNavigate();

  const sendFriendRequest = (user) => {
    apiClient("application/json")
      .post("/friend-requests/send_request/", { to_user_id: user.id })
      .then((res) => console.log("Success", res.data))
      .catch((err) => console.error("Error", err.response?.data || err));
  };

  const navigateToProfile = (stranger) => {
    if (stranger.username !== localStorage.username) {
      localStorage.setItem("viewedProfile", stranger.username);
      navigate(`/Profile/${stranger.username}`);
    } else {
      navigate("/Profile/");
      try {
        localStorage.removeItem(viewedProfile);
      } catch (ReferenceError) {
        console.log("Failed navigating to stranger profile");
      }
    }
  };

  useEffect(() => {
    const getSuggestedFriends = () => {
      apiClient("application/json")
        .get("/profile/suggested_friends/")
        .then((response) => {
          const profiles = response.data;
          setSuggestedFriends(profiles);
        })
        .catch((error) =>
          console.error("Error", error.response?.data || error)
        );
    };
    getSuggestedFriends();
  }, []);

  return (
    <>
      <Stack direction="vertical">
        <UserProfileInfo
          firstName={firstName}
          lastName={lastName}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          profileData={profileData}
          setProfileData={setProfileData}
          setUpdatedProfile={setUpdatedProfile}
          editButtonVisibility={editButtonVisibility}
        />
        <FriendsListOverlay
          friends={friends}
          setFriendsProfile={setFriendsProfile}
          loggedInUser={profileData.username || ""}
          asButton={true}
        />
        <SuggestedFriendsCarousel
          suggestedFriends={suggestedFriends}
          sendFriendRequest={sendFriendRequest}
          navigateToProfile={navigateToProfile}
        />
        <div>
          <button onClick={sendFriendRequest}>Send Friend Request</button>
          <button
            onClick={() => {
              apiClient("application/json")
                .get("/friend-requests/")
                .then((res) => console.log("My Friend Requests:", res.data))
                .catch((err) =>
                  console.error(
                    "Error getting requests:",
                    err.response?.data || err
                  )
                );
            }}
          >
            Get My Friend Requests
          </button>
          <button
            onClick={() => {
              const requestId = 5; // Replace this with a real FriendRequest ID
              apiClient("application/json")
                .put(`/friend-requests/${requestId}/`, {
                  status: "AC", // AC = accepted
                  to_user_id: 18,
                })
                .then((res) =>
                  console.log("Friend request accepted!", res.data)
                )
                .catch((err) =>
                  console.error(
                    "Error accepting request:",
                    err.response?.data || err
                  )
                );
            }}
          >
            Accept Friend Request
          </button>
        </div>

        <PostSection
          firstName={firstName}
          lastName={lastName}
          userId={profileData.username || ""}
          profilePicture={profilePicture}
          setUpdatedPosts={setUpdatedPosts}
          updatedPosts={updatedPosts}
          posts={posts}
        />
      </Stack>
    </>
  );
}
