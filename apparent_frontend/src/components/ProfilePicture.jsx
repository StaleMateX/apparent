import "./ProfilePicture.css";
import React, { useState } from "react";
import { Container, Image} from 'react-bootstrap';


export function ProfilePicture({firstName, lastName}) {
  return (
    <Container className="profile-picture-container">

        <h2>{firstName} {lastName}</h2>
          <Image className="profile-picture" roundedCircle src="../APParent_logo.png"/>


    </Container>
  );
}
