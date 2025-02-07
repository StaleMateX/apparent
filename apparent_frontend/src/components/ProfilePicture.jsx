import "./ProfilePicture.css";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

export function ProfilePicture(props) {
  return (
    <Container flex>
      <Col xs={6} md={4}>
        <Image
          className="profile-picture"
          src="../APParent_logo.png"
          roundedCircle
          flex
        />
      </Col>
    </Container>
  );
}
