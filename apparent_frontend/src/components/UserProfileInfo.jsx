import "./UserProfileInfo.css";
import { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { ProfilePicture } from "../components/ProfilePicture";

export function UserProfileInfo({ firstName, lastName }) {
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <div className="picture-container mt-2">
          <ProfilePicture
            className="profile-picture"
            firstName={firstName}
            lastName={lastName}
          />
        </div>
        <div className="p-2 info-container">
          <p className="info-text">{"College Name"}</p>
          <p className="info-text">{"City, State"}</p>
          <p className="info-text">Background Check: {"Status Unknown"}</p>
        </div>
        <div className="p-2 info-container">
          <p className="info-text">Hobbies: {"Not specified"}</p>
          <p className="info-text">Children: {"Not specified"}</p>
        </div>
      </Stack>
      <Form className="d-flex centered-label">
        <Form.Group controlId="aboutMeTextarea">
          <Form.Label className="centered-label pt-2">About Me</Form.Label>
          <Form.Control
            as="textarea"
            className="bg-color-light hide-scrollbar about-me-form mt-0"
            rows={2}
            value={""}
            readOnly
          />
        </Form.Group>
      </Form>
    </>
  );
}
