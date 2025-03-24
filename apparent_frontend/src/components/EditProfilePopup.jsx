import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { EditProfileForm } from "./Forms/EditProfileForm";

export function EditProfilePopup({
  popupTitle,
  show,
  handleClose,
  path,
  editPicture,
  props,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{popupTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable="true">
          <EditProfileForm handleClose={handleClose} {...props} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
