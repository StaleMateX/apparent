import "./UserProfileInfo.css";
import { useState, useContext, createContext, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { EditProfilePopup } from "./EditProfilePopup";
import { ProfilePicture } from "../components/ProfilePicture";

const UserInfoContext = createContext();

export function UserProfileInfo({ firstName, lastName }) {
  const [show, setShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState("../APParent_logo.png");
  const [collegeName, setCollegeName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [backgroundCheck, setBackgroundCheck] = useState("In Progress");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const userInfoState = useMemo(
    () => ({
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
    }),
    [
      profilePicture,
      collegeName,
      city,
      state,
      hobbies,
      backgroundCheck,
      phoneNumber,
      aboutMe,
    ]
  );

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const formatHobbies = (hobbies) => {
    return hobbies.length === 0 ? "" : hobbies.join(",\n");
  };

  return (
    <>
      <Container>
        <Row className="align-items-center">
          {/* <Stack direction="horizontal" gap={3}> */}
          <Col /* className="picture-container mt-2" */>
            <ProfilePicture
              className="profile-picture"
              /* className="profile-picture" */
              firstName={firstName}
              lastName={lastName}
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
                <p className="info-text">{"College Name"}</p>
                <p className="info-text">{"City, State"}</p>
                <p className="info-text">
                  Background Check: {"Status Unknown"}
                </p>
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
                readOnly={aboutMe}
                placeholder={"What do you look for in parent friends?"}
              />
            </Form.Group>
          </Form>
        </Row>
      </Container>
      <UserInfoContext.Provider value={userInfoState}>
        <EditProfilePopup
          popupTitle={"Edit Profile"}
          show={show}
          handleClose={handleClose}
          /* path={profilePicture}
          city={city}
          state={state}
          hobbies={hobbies}
          phoneNumber={phoneNumber}
          collegeName={collegeName}
          aboutMe={aboutMe} */
        />
      </UserInfoContext.Provider>
    </>
  );
}
