import "./UserProfileInfo.css";
import { useState, useContext, createContext, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { EditProfilePopup } from "./EditProfilePopup";
import { ProfilePicture } from "../components/ProfilePicture";

export function UserProfileInfo({
  firstName,
  lastName,
  profilePicture,
  setProfilePicture,
  profileData,
  setProfileData,
}) {
  const [show, setShow] = useState(false);
  const [collegeName, setCollegeName] = useState(profileData.institution);
  const [city, setCity] = useState(profileData.city);
  const [state, setState] = useState(profileData.state);
  const [hobbies, setHobbies] = useState(profileData.hobbies);
  const [backgroundCheck, setBackgroundCheck] = useState(
    profileData.backgroundCheck
  );
  const [phoneNumber, setPhoneNumber] = useState(profileData.phone_number);
  const [aboutMe, setAboutMe] = useState(profileData.about_me);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatHobbies = (hobbies) =>
    hobbies.length > 0
      ? hobbies
          .map((hobby_obj) => {
            return hobby_obj.hobby_type;
          })
          .join(", ")
      : "Not Shared";

  return (
    <>
      <Card className="card shadow-sm p-4 mb-4">
        <Row className="align-items-center">
          <Col xs={12} md={4} className="text-center">
            <ProfilePicture
              /* className="profile-picture" */ firstName={firstName}
              lastName={lastName}
              path={profilePicture}
            />
          </Col>
          <Col className="d-flex flex-column">
            <Row>
              <Col className="d-flex justify-content-end">
                <Button onClick={handleShow} className="edit-button">
                  Edit Profile
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="p-2 info-container">
                <p className="info-text">
                  <strong>Education: </strong>
                  {`${collegeName || "None"}`}
                </p>
                <p className="info-text">
                  <strong>Hometown: </strong>
                  {`${city ? `${city}, ` : ""}${state || "None"}`}
                </p>
                <p className="info-text">
                  <strong>Background Check: </strong>
                  {`${backgroundCheck || "Unknown"}`}
                </p>
              </Col>
              <Col className="p-2 info-container">
                <p className="info-text">
                  <strong>Hobbies: </strong>
                  {`${formatHobbies(hobbies)}`}
                </p>
                <p className="info-text">
                  <strong>Children: </strong> TBA
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card className="card shadow-sm p-4 mb-4">
        <Row className="mt-3">
          <Col
            /* className="d-flex centered-label" */ className="text-center w-100"
          >
            <Col>
              <strong>About Me</strong>
            </Col>
            <textarea
              className="hide-scrollbar mt-0 w-100"
              rows={2}
              readOnly
              value={aboutMe}
              placeholder="What do you look for in parent friends?"
            />
          </Col>
        </Row>
      </Card>
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
