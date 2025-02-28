import "./ProfilePicture.css";
import React, { useState } from "react";
import { Container, Image} from 'react-bootstrap';


export function ProfilePicture({firstName, lastName, path}) {
  return (
    <Container className="profile-picture-container">

        <h2>{firstName} {lastName}</h2>
          <Image className="profile-picture" roundedCircle src={path}/>


    </Container>
  );
}
