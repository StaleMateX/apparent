import "./PostCard.css";
import Card from "react-bootstrap/Card";

function cardWithImage() {}
function cardNoImage() {}

export function PostCard({ firstName, lastName }) {
  return (
    <>
      <Card className="text-center m-2">
        <Card.Header>
          <Card.Img variant="top" src="holder.js/100px180" /> {firstName}{" "}
          {lastName} timeposted{" "}
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
