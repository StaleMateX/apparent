import React, { useState, useEffect } from "react";
import apiClient from "../apiClient";
import Container from "react-bootstrap/Container";
import { UserProfilePage } from "./ProfilePages/UserProfilePage";
import { EditProfileForm } from "../components/Forms/EditProfileForm";

export function ProfilePage({
  firstName,
  lastName,
  setFirstName,
  setLastName,
}) {
  const [profileData, setProfileData] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiClient.get(`/profile/`);
        setProfileData(response.data[0]);
      } catch (err) {
        setError("Error fetching profile data");
        console.error("Error fetching profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [updatedProfile]);

  useEffect(() => {
    if (profileData) {
      setFirstName(profileData.first_name || "");
      setLastName(profileData.last_name || "");
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
      />
    </Container>
  );
}
