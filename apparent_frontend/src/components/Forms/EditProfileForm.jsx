import Form from "react-bootstrap/Form";
import { useState } from "react";
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
}) {
  const [localProfilePicture, setLocalProfilePicture] =
    useState(profilePicture);
  const [localCity, setLocalCity] = useState(city);
  const [localState, setLocalState] = useState(state);
  const [localCollegeName, setLocalCollegeName] = useState(collegeName);
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
  const [localHobbies, setLocalHobbies] = useState(hobbies);
  const [localAboutMe, setLocalAboutMe] = useState(aboutMe);

  const hobbiesOptions = [
    "Active Outdoors: Hiking, camping, biking, mud-runners",
    "Chill Outdoors: Strolling, site-seeing, gardening, yoga",
    "Active Indoors: Pilates, weight-lifting, dancing, martial arts",
    "Chill Indoors: Reading, Netflix and Chilling, games, movies",
    "Socials: Dinners, brunches, parties, board games",
    "Family Life: Parks, kid's places, museums, pools",
    "I'm open to anything",
    "I'm keeping it a mystery",
  ];

  const handleSelectedPath = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLocalProfilePicture(file);
    }
  };

  const handleHobbiesChange = (selectedItems) => {
    if (selectedItems.length <= 4) {
      setLocalHobbies(selectedItems);
    } else {
      alert("You can select up to 4 hobbies only.");
    }
  };

  // TODO: PLACE HOBBIES IN THE DATABASE RATHER THAN HERE? DISCUSS.
  const handleSubmit = (event) => {
    event.preventDefault();
    setProfilePicture(localProfilePicture);
    setCity(localCity);
    setState(localState);
    setCollegeName(localCollegeName);
    setPhoneNumber(localPhoneNumber);
    setHobbies(localHobbies);
    setAboutMe(localAboutMe);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formFileSm">
        <Form.Label>Change Profile Picture</Form.Label>
        <Form.Control
          type="file"
          size="sm"
          onChange={handleSelectedPath}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="City"
          value={localCity}
          onChange={(e) => setLocalCity(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="State"
          value={localState}
          onChange={(e) => setLocalState(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Higher Education Institution"
          value={localCollegeName}
          onChange={(e) => setLocalCollegeName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone Number"
          value={localPhoneNumber}
          onChange={(e) => setLocalPhoneNumber(e.target.value)}
        />
        <small className="form-text text-muted">Format: 555-555-5555</small>
      </Form.Group>

      <Form.Group className="mb-3" controlId="multiSelect">
        <Form.Label>Select up to 4 hobbies</Form.Label>
        <Multiselect
          data={hobbiesOptions}
          defaultValue={localHobbies}
          value={localHobbies}
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
          value={localAboutMe}
          onChange={(e) => setLocalAboutMe(e.target.value)}
        />
      </Form.Group>

      <button type="submit" className="btn btn-primary">
        Save Profile
      </button>
    </Form>
  );
}
