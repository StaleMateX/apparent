import "./PostCard.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";

export function PostCard({ firstName, lastName, profilePicture }) {
  return (
    <>
      <Card className="card text-center">
        <Card.Header className="d-flex p-3">
          <Col>
            <Image
              className="card-picture"
              roundedCircle
              src={profilePicture}
            />{" "}
            {firstName} {lastName}
          </Col>
          2h
        </Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          {" "}
          <Card.Link href="#">Comments</Card.Link>
          <Card.Link href="#">Reaction</Card.Link>
        </Card.Footer>
      </Card>
    </>
  );
}
