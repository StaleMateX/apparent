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
import apiClient from "../../apiClient";

export function FriendsListOverlay({ friends, viewRequestsLink, asButton }) {
  const [show, setShow] = useState(false);
  const [selectedRequestsList, setSelectedRequestsList] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigateToFriendsProfile = (username) => {
    if (username !== localStorage.username) {
      localStorage.setItem("viewedProfile", username);
      navigate(`/Profile/${username}`);
    } else {
      navigate("/Profile/");
      try {
        localStorage.removeItem("viewedProfile");
      } catch (ReferenceError) {
        handleClose();
      }
    }
    handleClose();
  };

  const fetchFriendRequests = () => {
    apiClient("application/json")
      .get("/friend-requests/")
      .then((response) => {
        const requests = response.data || [];
        const incoming = requests.filter(
          (request) => request.from_user.username !== localStorage.username
        );
        setFriendRequests(incoming);
      })
      .catch((err) =>
        console.error("Error getting requests:", err.response?.data || err)
      );
  };

  useEffect(() => {
    if (selectedRequestsList) {
      fetchFriendRequests();
    }
  }, [selectedRequestsList]);

  const updateFriendRequest = (request, status, message) => {
    const requestId = request.id; // Replace this with a real FriendRequest ID
    apiClient("application/json")
      .patch(`/friend-requests/${requestId}/`, {
        status: status, // AC = accepted
      })
      .then((res) => {
        console.log(`Friend request ${message}!`, res.data);
        setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));
      })
      .catch((err) =>
        console.error(`Error ${message} request:`, err.response?.data || err)
      );
  };

  const renderFriendRequests = () => {
    if (friendRequests.length === 0) {
      return "No friend requests.";
    }

    return friendRequests.map((request) => (
      <Fragment key={request.id}>
        <Nav.Link
          onClick={() => navigateToFriendsProfile(request.from_user.username)}
        >
          <Col>
            <Image
              className="card-picture"
              roundedCircle
              src={request.from_user_picture || "../APParent_logo.png"}
            />{" "}
            {request.from_user.first_name} {request.from_user.last_name}
          </Col>
        </Nav.Link>
        <Button
          variant="primary"
          onClick={() => updateFriendRequest(request, "AC", "accepting")}
        >
          Accept
        </Button>
        <Button
          variant="danger"
          onClick={() => updateFriendRequest(request, "DE", "denying")}
        >
          Decline
        </Button>
        <Button
          variant="warning"
          onClick={() => updateFriendRequest(request, "IG", "ignoring")}
        >
          Ignore
        </Button>
        <br />
      </Fragment>
    ));
  };

  const friendLinks = () => {
    if (!friends || friends.length === 0) {
      return "No friends to show";
    }

    return friends.map((friend) => (
      <Fragment key={friend.id}>
        <Nav.Link onClick={() => navigateToFriendsProfile(friend.username)}>
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
    ));
  };

  return (
    <>
      {asButton ? (
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faUsers} /> Friends{" "}
        </Button>
      ) : (
        <Nav.Link as="button" onClick={handleShow}>
          <FontAwesomeIcon icon={faUsers} /> Friends{" "}
        </Nav.Link>
      )}

      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Friends List</Offcanvas.Title>
        </Offcanvas.Header>
        {viewRequestsLink && (
          <Offcanvas.Header>
            <Nav
              defaultActiveKey="/home"
              onSelect={() => {
                setSelectedRequestsList(true);
              }}
            >
              <Nav.Item>
                <Nav.Link onClick={() => setSelectedRequestsList(true)}>
                  View Friend Requests
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Offcanvas.Header>
        )}
        <Offcanvas.Body>
          {selectedRequestsList ? renderFriendRequests() : friendLinks()}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
