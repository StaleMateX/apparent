import React from "react";
import Stack from "react-bootstrap/Stack";
import { UserProfileInfo } from "../../components/UserProfileInfo";
import { PostSection } from "../../components/PostSection";

export function UserProfilePage({ firstName, lastName }) {
  return (
    <>
      <Stack direction="vertical">
        <UserProfileInfo firstName={firstName} lastName={lastName} />
        <PostSection firstName={firstName} lastName={lastName} />
      </Stack>
    </>
  );
}
