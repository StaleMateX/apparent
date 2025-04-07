import "./PostCard.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";

export function PostCard({
  firstName,
  lastName,
  profilePicture,
  title,
  createdAt,
  content,
  comments,
}) {
  const getTime = () => {
    if (createdAt) {
      const date = new Date(createdAt);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const time = date.getTime();
      const todaysDate = new Date(Date.now());
      // Content was created in the same year
      if (year === todaysDate.getFullYear()) {
        if (month === todaysDate.getMonth()) {
          if (day === todaysDate.getDate()) {
            const hours = todaysDate.getTime() - time;
            if (hours > 1) {
              return `${hours} hours ago`;
            } else {
              return `${hours.getMinutes()} min ago`;
            }
          } else {
            const numDays = todaysDate.getDate() - day;
            return `${numDays} ${numDays === 1 ? "day" : "days"}`;
          }
        } else {
          return date.toDateString();
        }
      }
      // Content was created in a different year
      else {
        return date.toDateString();
      }
    }
  };

  return (
    <>
      <Card className="card text-center mb-3 rounded-3 shadow">
        <Card.Header className="d-flex p-3">
          <Col>
            <Image
              className="card-picture"
              roundedCircle
              src={profilePicture}
            />{" "}
            {firstName} {lastName}
          </Col>
          {getTime()}
        </Card.Header>
        <Card.Body>
          <Card.Title>{`${title}`}</Card.Title>
          <Card.Text>{`${content}`}</Card.Text>
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
