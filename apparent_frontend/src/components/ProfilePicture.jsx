import "./ProfilePicture.css";
import React, { useState } from "react";
import { Container, Image} from 'react-bootstrap';


export function ProfilePicture(props) {
  return (
    <Container className="profile-picture-container">


        <h2>Brandi Keylor</h2>
          <Image className="profile-picture" roundedCircle src="../APParent_logo.png"/>


    </Container>
  );
}
