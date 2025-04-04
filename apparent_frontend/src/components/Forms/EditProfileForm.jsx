import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";

export function EditProfileForm({
  profilePicture,
  setProfilePicture,
  city,
  setCity,
  state,
  setState,
  collegeName,
  setCollegeName,
  phoneNumber,
  setPhoneNumber,
  hobbies,
  setHobbies,
  aboutMe,
  setAboutMe,
  handleClose,
  updateProfileData,
}) {
  const [newProfilePicture, setNewProfilePicture] = useState(false);
  const [newCity, setNewCity] = useState(city);
  const [newState, setNewState] = useState(state);
  const [newCollegeName, setNewCollegeName] = useState(collegeName);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [newHobbies, setNewHobbies] = useState(
    hobbies.length > 0
      ? hobbies.map((hobby) => ({
          hobby_type: hobby.hobby_type,
          hobby_type_display: hobby.hobby_type_display,
        }))
      : []
  );
  const [updatedHobbies, setUpdatedHobbies] = useState(""); // Will be array if updated
  const [newAboutMe, setNewAboutMe] = useState(aboutMe);

  const hobbyOptions =
    hobbies.length > 0 && Array.isArray(hobbies[0].hobby_options)
      ? hobbies[0].hobby_options
      : [];

  const handleSelectedPath = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProfilePicture(file);
    }
  };

  const handleHobbiesChange = (selectedItems) => {
    if (selectedItems.length <= 4) {
      setNewHobbies(selectedItems);
      setUpdatedHobbies(selectedItems.map((item) => item.hobby_type));
    } else {
      alert("You can select up to 4 hobbies only.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (profilePicture !== newProfilePicture) {
    //   setProfilePicture(URL.createObjectURL(newProfilePicture));
    // }
    // setCity(newCity);
    // setState(newState);
    // setCollegeName(newCollegeName);
    // setPhoneNumber(newPhoneNumber);
    // setHobbies(newHobbies);
    // setAboutMe(newAboutMe);
    const formData = new FormData();
    if (newProfilePicture) {
      formData.append("profile_image", newProfilePicture);
    }
    formData.append("city", newCity);
    formData.append("state", newState);
    formData.append("institution", newCollegeName);
    formData.append("phone_number", newPhoneNumber);
    formData.append("about_me", newAboutMe);
    if (Array.isArray(updatedHobbies)) {
      updatedHobbies.forEach((hobby) => {
        formData.append("hobbies", hobby);
      });
    }
    updateProfileData(formData);
    handleClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formFileSm">
        <Form.Label>Change Profile Picture</Form.Label>
        <Form.Control type="file" size="sm" onChange={handleSelectedPath} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="City"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="State"
          value={newState}
          onChange={(e) => setNewState(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Higher Education Institution"
          value={newCollegeName}
          onChange={(e) => setNewCollegeName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone Number"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
        <small className="form-text text-muted">Format: 555-555-5555</small>
      </Form.Group>

      <Form.Group className="mb-3" controlId="multiSelect">
        <Form.Label>Select up to 4 hobbies</Form.Label>
        <Multiselect
          dropUp
          dataKey="hobby_type"
          textField="hobby_type_display"
          data={hobbyOptions}
          value={newHobbies}
          onChange={handleHobbiesChange}
          placeholder="Select your hobbies"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="about-me">
        <Form.Label>About me</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="About your student parent experience"
          value={newAboutMe}
          onChange={(e) => setNewAboutMe(e.target.value)}
        />
      </Form.Group>

      <button type="submit" className="btn btn-primary">
        Save Profile
      </button>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Form>
  );
}
