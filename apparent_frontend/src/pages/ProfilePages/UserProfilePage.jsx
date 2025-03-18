import React from "react";
import Stack from "react-bootstrap/Stack";
import { UserProfileInfo } from "../../components/UserProfileInfo";
import { PostSection } from "../../components/PostSection";

export function UserProfilePage({
  firstName,
  lastName,
  profilePicture,
  setProfilePicture,
  profileData,
  setProfileData
}) {
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
        />
        <PostSection
          firstName={firstName}
          lastName={lastName}
          profilePicture={profilePicture}
        />
      </Stack>
    </>
  );
}
