import React from "react";
import Stack from "react-bootstrap/Stack";
import { UserProfileInfo } from "../../components/UserProfileInfo";
import { PostSection } from "../../components/PostSection";

export function PublicProfilePage({ firstName, lastName }) {
  return (
    <>
      <Stack direction="vertical">
        <UserProfileInfo firstName={firstName} lastName={lastName} />
        {/* TODO: Add connect, Ask to schedule care, Ask to message ( can only see messages between person and self) */}
      </Stack>
    </>
  );
}
