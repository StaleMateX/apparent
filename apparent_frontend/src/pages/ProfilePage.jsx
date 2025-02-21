import React, { useState, useEffect } from "react";
import apiClient from "../apiClient";
import Stack from "react-bootstrap/Stack";
import { UserProfileInfo } from "../components/UserProfileInfo";
import { PostSection } from "../components/PostSection";

export function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiClient.get("profile/");
        setProfileData(response.data[0]);
      } catch (err) {
        setError("Error fetching profile data");
        console.error("Error fetching profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Stack direction="vertical">
        <UserProfileInfo
          firstName={profileData.username}
          lastName={profileData.uID}
        />
        <PostSection
          firstName={profileData.username}
          lastName={profileData.uID}
        />
      </Stack>
    </>
  );
}
