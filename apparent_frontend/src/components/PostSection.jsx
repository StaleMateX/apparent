import "./PostSection.css";
import { PostCard } from "./PostCard";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Stack from "react-bootstrap/Stack";

export function PostSection({ firstName, lastName }) {
  return (
    <>
      <ButtonToolbar
        className="custom-button-toolbar mb-3"
        aria-label="Toolbar with a button group"
      >
        <ButtonGroup
          className="custom-button-group me-3"
          aria-label="First group"
        >
          <Button className="custom-button">Profile Feed</Button>
          <Button className="custom-button">Your Posts</Button>
          <Button className="custom-button">Favorites</Button>
        </ButtonGroup>
        <ButtonGroup
          className="custom-button ms-auto"
          aria-label="Second group"
        >
          <Button className="custom-button">Post Something</Button>
        </ButtonGroup>
      </ButtonToolbar>
      <PostCard firstName={firstName} lastName={lastName} />
    </>
  );
}
