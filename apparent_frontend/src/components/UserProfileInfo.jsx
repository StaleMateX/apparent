import "./UserProfileInfo.css";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { ProfilePicture } from "../components/ProfilePicture";

// The top portion of the profile page with user info. Write permissions for user/readonly permissions for friends' profile pages.
export function UserProfileInfo() {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="picture-container mt-2">
        {/* <ProfilePicture firstName="Johnny" lastName="Cash"/> */}
        <ProfilePicture className="profile-picture" />
        <Form className="d-flex centered-label">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className="centered-label pt-2">About Me</Form.Label>
            <Form.Control
              as="textarea"
              className="bg-color-light hide-scrollbar about-me-form mt-0"
              rows={2}
            />
          </Form.Group>
        </Form>
      </div>
      <div className="p-2 info-container">
        <p>FirstName LastName</p>
        <p>CollegeName</p>
        <p>City, State</p>
        <p>Passed Backgroud: True/False/In progress</p>
      </div>
      <div className="p-2 info-container">
        <p>Hobbies: ...</p>
        <p>Children: 4 yrs, 1 yr, Baby on the way</p>
      </div>
    </Stack>
  );
}
