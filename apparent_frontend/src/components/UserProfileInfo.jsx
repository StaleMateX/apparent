import "./UserProfileInfo.css";
import { useState, useContext, createContext, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { EditProfilePopup } from "./EditProfilePopup";
import { ProfilePicture } from "../components/ProfilePicture";

export function UserProfileInfo({ firstName, lastName }) {
  const [show, setShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState("../APParent_logo.png");
  const [collegeName, setCollegeName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [hobbies, setHobbies] = useState(["I'm keeping it a mystery"]);
  const [backgroundCheck, setBackgroundCheck] = useState("In Progress");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatHobbies = (hobbies) =>
    hobbies.length > 0 ? hobbies.join(", ") : "Not Shared";

  return (
    <>
      <Container>
        <Row className="align-items-center">
          <Col>
            <ProfilePicture
              /* className="profile-picture" */ firstName={firstName}
              lastName={lastName}
              path={profilePicture}
            />
          </Col>
          <Col className="d-flex flex-column">
            <Row>
              <Col className="d-flex justify-content-end">
                <Button onClick={handleShow} variant="outline-primary">
                  Edit Profile
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="p-2 info-container">
                <p className="info-text">{`Education: ${
                  collegeName || "None"
                }`}</p>
                <p className="info-text">{`Hometown: ${
                  city ? `${city}, ` : ""
                }${state || "None"}`}</p>
                <p className="info-text">{`Background Check: ${
                  backgroundCheck || "Unknown"
                }`}</p>
              </Col>
              <Col className="p-2 info-container">
                <p className="info-text">{`Hobbies: ${formatHobbies(
                  hobbies
                )}`}</p>
                <p className="info-text">Children: TBA</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <Form
            /* className="d-flex centered-label" */ className="text-center w-100"
          >
            <Form.Group controlId="aboutMeTextarea">
              <Form.Label>About Me</Form.Label>
              <Form.Control
                as="textarea"
                className="bg-color-light hide-scrollbar about-me-form mt-0 w-100"
                rows={2}
                readOnly
                value={aboutMe}
                placeholder="What do you look for in parent friends?"
              />
            </Form.Group>
          </Form>
        </Row>
      </Container>

      <EditProfilePopup
        popupTitle="Edit Profile"
        show={show}
        handleClose={handleClose}
        props={{
          profilePicture,
          setProfilePicture,
          collegeName,
          setCollegeName,
          city,
          setCity,
          state,
          setState,
          hobbies,
          setHobbies,
          backgroundCheck,
          setBackgroundCheck,
          phoneNumber,
          setPhoneNumber,
          aboutMe,
          setAboutMe,
        }}
      />
    </>
  );
}
