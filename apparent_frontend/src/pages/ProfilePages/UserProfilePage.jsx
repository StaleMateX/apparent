import React from "react";
import Stack from "react-bootstrap/Stack";
import { UserProfileInfo } from "../../components/UserProfileInfo";
import { PostSection } from "../../components/PostSection";
import { FriendsListOverlay } from "../../components/Extras/FriendsListOverlay";

export function UserProfilePage({
  firstName,
  lastName,
  profilePicture,
  setProfilePicture,
  profileData,
  setProfileData,
  setUpdatedProfile,
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
          setUpdatedProfile={setUpdatedProfile}
        />
        <PostSection
          firstName={firstName}
          lastName={lastName}
          profilePicture={profilePicture}
        />
        <FriendsListOverlay />
      </Stack>
    </>
  );
}
