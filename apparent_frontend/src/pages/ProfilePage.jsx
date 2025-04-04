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
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const endpoint = friendsProfile
          ? `/profile/${friendsProfile.username}/`
          : "/profile/my_profile/";
        const response = await apiClient("application/json").get(endpoint);
        setProfileData(response.data);
        setUpdatedProfile(false);
      } catch (err) {
        setError("Error fetching profile data");
        console.error("Error fetching profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [updatedProfile, friendsProfile]);

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
      />
      <button
        onClick={() => {
          apiClient("application/json")
            .post("/friend-requests/send_request/", { to_user_id: 18 })
            .then((res) => console.log("Success", res.data))
            .catch((err) => console.error("Error", err.response?.data || err));
        }}
      >
        Send Friend Request
      </button>
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
            .then((res) => console.log("Friend request accepted!", res.data))
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
    </Container>
  );
}
