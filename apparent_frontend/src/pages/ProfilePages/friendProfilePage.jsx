import React from "react";
import Stack from "react-bootstrap/Stack";
import { UserProfileInfo } from "../../components/UserProfileInfo";
import { PostSection } from "../../components/PostSection";

export function FriendProfilePage({ firstName, lastName }) {
  return (
    <>
      <Stack direction="vertical">
        {/* TODO: Change name to friends name grabbed from search bar. Create different post sections for public, private, and personal messages. */}
        <UserProfileInfo firstName={firstName} lastName={lastName} />
        <PostSection firstName={firstName} lastName={lastName} />
      </Stack>
    </>
  );
}
