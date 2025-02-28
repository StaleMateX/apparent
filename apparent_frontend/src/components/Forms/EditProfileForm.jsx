import Form from "react-bootstrap/Form";
import { useState } from "react";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";

export function EditProfileForm({ editPicture, path }) {
  const [selectedPath, setSelectedPath] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const handleHobbiesChange = (selectedItems) => {
    if (selectedItems.length <= 4) {
      setSelectedHobbies(selectedItems);
    } else {
      alert("You can select up to 4 hobbies only.");
    }
  };

  const handleSelectedPath = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPath(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editPicture(selectedPath);
    // TODO: COMMUNICATE CHANGES IN ALL THE FIELDS
  };

  // TODO: PLACE ACTIONS IN THE DATABASE RATHER THAN HERE? DISCUSS.
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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formFileSm">
        <Form.Label>Change profile picture</Form.Label>
        <Form.Control type="file" size="sm" onChange={handleSelectedPath} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control id="city" type="text" placeholder="City" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control id="state" type="text" placeholder="State" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          id="college"
          type="text"
          placeholder="Higher Education Institution"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          id="phone"
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="Phone Number"
        />
        <small className="form-text text-muted">Format: 555-555-5555</small>
      </Form.Group>

      <Form.Group className="mb-3" controlId="multiSelect">
        <Form.Label>Select up to 4 hobbies</Form.Label>
        <Multiselect
          data={hobbiesOptions}
          value={selectedHobbies}
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
        />
      </Form.Group>

      <button type="submit" className="btn btn-primary">
        Save Profile
      </button>
    </Form>
  );
}
