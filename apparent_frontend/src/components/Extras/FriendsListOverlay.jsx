import { useEffect, useState } from "react";
import { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import "../PostCard.css";
import { useNavigate } from "react-router-dom";

export function FriendsListOverlay({
  friends,
  setFriendsProfile,
  loggedInUser,
}) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const friendLinks = () => {
    if (!friends || friends.length === 0) {
      return "No friends to show";
    }

    const navigateToFriendsProfile = (friend) => {
      if (friend.username !== localStorage.username) {
        localStorage.setItem("viewedProfile", friend.username);
        navigate(`/Profile/${friend.username}`);
      } else {
        navigate("/Profile/");
        try {
          localStorage.removeItem(viewedProfile);
        } catch (ReferenceError) {
          handleClose();
        }
      }
      handleClose();
    };

    return friends.map((friend) => {
      return (
        <Fragment key={friend.id}>
          <Nav.Link onClick={() => navigateToFriendsProfile(friend)}>
            <Col>
              <Image
                className="card-picture"
                roundedCircle
                src={friend.profile_image || "../APParent_logo.png"}
              />{" "}
              {friend.first_name} {friend.last_name}
            </Col>
          </Nav.Link>
          <br />
        </Fragment>
      );
    });
  };

  useEffect(() => {}, [friends]);

  return (
    <>
      <Nav.Link onClick={handleShow}>
        <FontAwesomeIcon icon={faUsers} /> Friends{" "}
      </Nav.Link>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}

      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Friends List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{friendLinks()}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
