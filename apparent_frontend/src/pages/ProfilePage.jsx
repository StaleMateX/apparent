import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { UserProfileInfo } from "../components/UserProfileInfo";
import { PostSection } from "../components/PostSection";

export function ProfilePage() {
  return (
    <>
      <Stack direction="vertical">
        <UserProfileInfo />
        <PostSection />
      </Stack>
    </>
  );
}
