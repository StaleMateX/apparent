import "./ProfilePicture.css";
import React, { useState } from "react";
import { Container, Image} from 'react-bootstrap';


export function ProfilePicture({firstName, lastName, path}) {
  return (
    <Container className="profile-picture-container">

        <h2 className="profile-name mt-3">{firstName} {lastName}</h2>
          <Image alt="Profile" className="profile-picture" roundedCircle src={path}/>


    </Container>
  );
}
