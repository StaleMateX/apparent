import "./UserProfileInfo.css";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { EditProfilePopup } from "./EditProfilePopup";
import { ProfilePicture } from "../components/ProfilePicture";
import apiClient from "../apiClient";

export function UserProfileInfo({
  firstName,
  lastName,
  profilePicture,
  setProfilePicture,
  profileData,
  setProfileData,
  updatedProfile,
  setUpdatedProfile,
}) {
  const [show, setShow] = useState(false);
  const [callAPI, setCallAPI] = useState(false);
  const [collegeName, setCollegeName] = useState(
    profileData.institution || "Not Shared"
  );
  const [city, setCity] = useState(profileData.city || "");
  const [state, setState] = useState(profileData.state || "Not Shared");
  const [hobbies, setHobbies] = useState(profileData.hobbies_ro || []);
  const [backgroundCheck, setBackgroundCheck] = useState(
    profileData.background_check_display || "No"
  );
  const [phoneNumber, setPhoneNumber] = useState(
    profileData.phone_number || "None"
  );
  const [classStanding, setClassStanding] = useState(
    profileData.class_standing_display || "Unknown"
  );
  const [aboutMe, setAboutMe] = useState(profileData.about_me || "");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formatHobbies = (hobbies) => {
    if (!hobbies || hobbies.length === 0) {
      return "No hobbies to share.";
    }
    return hobbies.map((hobby_obj) => {
      return (
        <p className="info-text" key={hobby_obj.hobby_type}>
          {hobby_obj.hobby_type_display}
        </p>
      );
    });
  };

  const updateProfileData = async (updatedProfileData) => {
    try {
      const response = await apiClient("multipart/form-data").patch(
        `/profile/${profileData.username}/`,
        updatedProfileData
      );
      setUpdatedProfile(true);
    } catch (error) {
      console.error("Error updating profile data:", error);
      alert("Error updating profile data");
    }
  };

  useEffect(() => {
    if (profileData) {
      setCollegeName(profileData.institution || "Not Shared");
      setCity(profileData.city || "");
      setState(profileData.state || "Not Shared");
      setHobbies(profileData.hobbies_ro || []);
      setBackgroundCheck(profileData.background_check_display || "No");
      setPhoneNumber(profileData.phone_number || "None");
      setClassStanding(profileData.class_standing_display || "Unknown");
      setAboutMe(profileData.about_me || "");
    }
  }, [profileData]);

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
                <strong>{"Hobbies: "}</strong>
                {formatHobbies(hobbies)}
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
          updateProfileData,
        }}
      />
    </>
  );
}
