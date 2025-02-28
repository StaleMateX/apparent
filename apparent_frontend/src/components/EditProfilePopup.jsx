import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { EditProfileForm } from "./Forms/EditProfileForm";

export function EditProfilePopup({
  popupTitle,
  show,
  handleClose,
  path,
  editPicture,
  props
}) {
  const handleSave = () => {
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{popupTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
          <EditProfileForm {...props} />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
