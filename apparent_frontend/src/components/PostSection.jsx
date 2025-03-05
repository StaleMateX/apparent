import "./PostSection.css";
import { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButton from "react-bootstrap/ToggleButton";
import Stack from "react-bootstrap/Stack";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

export function PostSection({ firstName, lastName }) {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  return (
    <>
      <ToggleButtonGroup
        type="radio"
        className="custom-button-toolbar mb-3"
        aria-label="Toolbar with a button group"
        name="profile tabs"
      >
        <ToggleButtonGroup
          className="custom-button-group me-3"
          aria-label="First group"
          defaultValue={1}
        >
          <ToggleButton
            className="custom-button first"
            id="tbg-radio-1"
            value={1}
          >
            Profile Feed
          </ToggleButton>
          <ToggleButton className="custom-button" id="tbg-radio-2" value={2}>
            Your Posts
          </ToggleButton>
          <ToggleButton className="custom-button" id="tbg-radio-3" value={3}>
            Favorites
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup className="ms-auto" aria-label="Second group">
          <ToggleButton
            className="custom-button last"
            id="tbg-radio-4"
            value={4}
          >
            Post Something
          </ToggleButton>
        </ToggleButtonGroup>
      </ToggleButtonGroup>
      <PostCard firstName={firstName} lastName={lastName} />
    </>
  );
}
