import "./UserProfileInfo.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { ProfilePicture } from "../components/ProfilePicture";

export function UserProfileInfo({ firstName, lastName }) {
  return (
    <Container>
      <Row className="align-items-center">
        {/* <Stack direction="horizontal" gap={3}> */}
        <Col /* className="picture-container mt-2" */>
          <ProfilePicture
            /* className="profile-picture" */
            firstName={firstName}
            lastName={lastName}
          />
        </Col>
        <Col className="d-flex flex-column">
          <Row>
            <Col className="d-flex justify-content-end">
              <Button variant="outline-primary">Edit Profile</Button>
            </Col>
          </Row>
          <Row>
            <Col className="p-2 info-container">
              <p className="info-text">{"College Name"}</p>
              <p className="info-text">{"City, State"}</p>
              <p className="info-text">Background Check: {"Status Unknown"}</p>
            </Col>
            <Col className="p-2 info-container">
              <p className="info-text">Hobbies: {"Not specified"}</p>
              <p className="info-text">Children: {"Not specified"}</p>
            </Col>
          </Row>
        </Col>
        {/* </Stack> */}
      </Row>
      <Row className="mt-3">
        <Form
          className="text-center w-100" /* className="d-flex centered-label" */
        >
          <Form.Group controlId="aboutMeTextarea">
            <Form.Label /* className="centered-label pt-2" */>
              About Me
            </Form.Label>
            <Form.Control
              as="textarea"
              className="bg-color-light hide-scrollbar about-me-form mt-0 w-100"
              rows={2}
              value={""} /*  TODO: Probably put a handler here */
              placeholder={"What do you look for in parent friends?"}
            />
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
