import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { EditProfileForm } from "./Forms/EditProfileForm";

/* For context of this components parent, see parent. The child of this component updates it's grandparent's state variables. */
export function EditProfilePopup({
  popupTitle,
  show,
  handleClose,
  path,
  editPicture,
}) {
  /* const [collegeName, setCollegeName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [backgroundCheck, setBackgroundCheck] = useState("In Progress");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutMe, setAboutMe] = useState("");
 */
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{popupTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
          <EditProfileForm /*  editPicture={editPicture} path={path} */ />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
