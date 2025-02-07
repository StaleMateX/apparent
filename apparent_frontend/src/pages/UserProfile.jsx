// Jacob B.s profile page
import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { ProfilePicture } from "./components/ProfilePicture";

function EmailAddressEditor() {
  return (
    <div style={{ border: "2px solid gray", padding: 10 }}>
      Email: <input type="email" name="email" />
    </div>
  );
}

function DisplayNameEditor() {
  return (
    <div style={{ border: "2px solid gray", padding: 10 }}>
      Display name: <input type="text" name="display name" />
    </div>
  );
}

function UsernameEditor() {
  const [isUsernameValid, setIsUsernameValid] = useState("");
  function handleUsernameChanged(e) {
    var username = e.target.value;

    setIsUsernameValid(testUsernameValidity(username));
  }

  function testUsernameValidity(username) {
    var regex = new RegExp("^[A-Za-z0-9_]+$");
    return regex.test(username);
  }

  return (
    <div style={{ border: "2px solid gray", padding: 10 }}>
      Username: @
      <input type="text" name="username" onChange={handleUsernameChanged} />
      <div style={{ color: isUsernameValid ? "#00ff00" : "#ff0000" }}>
        {isUsernameValid ? "✓" : "✗"} Must be 1 or more alphanumeric characters
        and/or underscores
      </div>
    </div>
  );
}

function AboutMeEditor() {
  return (
    <div style={{ border: "2px solid gray", padding: 10 }}>
      About me: <textarea name="about me" rows="5" cols="40" />
    </div>
  );
}

function SaveChangesButton() {
  return (
    <div>
      <button type="submit">Save changes</button>
    </div>
  );
}

export function UserProfile() {
  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <div></div>
        <div className="p-2">
          {/* <ProfilePicture firstName="Johnny" lastName="Cash"/> */}
          <ProfilePicture />
        </div>
        <div className="p-2 ms-auto">{EmailAddressEditor()}</div>
        <div className="p-2">{DisplayNameEditor()}</div>
      </Stack>
      {UsernameEditor()}
      {AboutMeEditor()}

      {SaveChangesButton()}
    </>
  );
}
