import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import "../PostCard.css";

export function FriendsListOverlay({ friends }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const friendLinks = () => {
    if (!friends || friends.length === 0) {
      return "No friends to show";
    }

    return friends.map((friend) => {
      return (
        <>
          <Nav.Link key={friend.id} href={`#/Profile/`}>
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
        </>
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
