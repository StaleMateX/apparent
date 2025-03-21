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
  const [collegeName, setCollegeName] = useState(
    profileData.institution || "Not Shared"
  );
  const [city, setCity] = useState(profileData.city || "");
  const [state, setState] = useState(profileData.state || "Not Shared");
  const [hobbies, setHobbies] = useState(profileData.hobbies);
  const [backgroundCheck, setBackgroundCheck] = useState(
    profileData.background_check_display || "No"
  );
  const [phoneNumber, setPhoneNumber] = useState(profileData.phone_number);
  const [classStanding, setClassStanding] = useState(
    profileData.class_standing_display
  );
  const [aboutMe, setAboutMe] = useState(profileData.about_me);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatHobbies = (hobbies) => {
    if (!hobbies || hobbies.length === 0) {
      return "No hobbies to share.";
    }

    return hobbies.map((hobby_obj) => {
      let hobbyDescription = "";

      switch (hobby_obj.hobby_type) {
        case "NS":
          hobbyDescription = "Ask me to find out";
          break;
        case "OP":
          hobbyDescription = "Everything from hiking to reading indoors";
          break;
        case "FL":
          hobbyDescription =
            "Family Life - parks, kid's places, museums, pools";
          break;
        case "SO":
          hobbyDescription =
            "Socials - dinners, brunches, parties, board games";
          break;
        case "CI":
          hobbyDescription =
            "Chill Indoors - reading, Netflix and chill, games, movies";
          break;
        case "AI":
          hobbyDescription =
            "Active Indoors - pilates, weight-lifting, dancing, martial arts";
          break;
        case "CO":
          hobbyDescription =
            "Chill Outdoors - strolling, site-seeing, gardening, yoga";
          break;
        case "AO":
          hobbyDescription =
            "Active Outdoors - hiking, camping, biking, mud-runners";
          break;
        default:
          hobbyDescription = "Add a hobby";
      }

      return <p key={hobby_obj.hobby_type}>{hobbyDescription}</p>;
    });
  };

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
                  <strong>Hometown: </strong>
                  {`${city ? `${city}, ` : ""}${state || "None"}`}
                </p>
                <p className="info-text">
                  <strong>Education: </strong>
                  {`${collegeName || "None"}`}
                </p>
                <p className="info-text">
                  <strong>Class Standing: </strong> {`${classStanding}`}
                </p>
                <p className="info-text">
                  <strong>Background Check: </strong>
                  {`${backgroundCheck}`}
                </p>
              </Col>
              <Col className="p-2 info-container">
                <p className="info-text">
                  <strong>{"Hobbies: "}</strong>
                  <br />
                  {formatHobbies(hobbies)}
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
