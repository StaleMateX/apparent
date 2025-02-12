// import '../assets/css/App.css'
import "./CustomNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faHouse,
  faMapLocationDot,
  faBell,
  faUser,
  faHandsHoldingChild,
  faStar,
  faBullhorn,
  faUsers,
  faCalendarDays,
  faHandHoldingDollar,
  faMountainCity,
  faPersonHiking,
} from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

export function CustomNavbar() {
  return (
    <>
      {/* false, 'sm', 'md', 'lg', 'xl', 'xxl' dynamically input one of these based on browser window size*/}
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-primary menu">
          <Container fluid>
            <Navbar.Toggle
              className="me-2"
              aria-controls={`offcanvasNavbar-expand-${expand}`}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Navbar.Brand href="#/Profile">
                    <img
                      alt=""
                      src="./APParent_Logo.png"
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    />{" "}
                    APParent
                  </Navbar.Brand>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav.Link href="#/Profile">
                  <FontAwesomeIcon icon={faHouse} /> FName LName{" "}
                </Nav.Link>
                <Nav.Link href="#/CareMap">
                  <FontAwesomeIcon icon={faMapLocationDot} /> Shared Care{" "}
                </Nav.Link>
                <Nav.Link href="#/Forum">
                  <FontAwesomeIcon icon={faBullhorn} /> Community Forum{" "}
                </Nav.Link>
                <hr className="offcanvas-divider" role="separator"></hr>
                <p className="offcanvas-section-header">Your Content</p>
                <Nav.Link href="#/Profile">
                  <FontAwesomeIcon icon={faMessage} /> Messages{" "}
                </Nav.Link>
                <Nav.Link href="#/Profile">
                  <FontAwesomeIcon icon={faStar} /> Forum Contributions{" "}
                </Nav.Link>
                <Nav.Link href="#/Profile">
                  <FontAwesomeIcon icon={faUsers} /> Matched Friends{" "}
                </Nav.Link>
                <Nav.Link href="#/Profile">
                  <FontAwesomeIcon icon={faCalendarDays} /> Scheduled Care{" "}
                </Nav.Link>
                <hr className="offcanvas-divider" role="separator"></hr>
                <p className="offcanvas-section-header">Hot Topics</p>
                <Nav.Link href="#/Profile">
                  <FontAwesomeIcon icon={faHandHoldingDollar} /> Financial
                  Support{" "}
                </Nav.Link>
                <Nav.Link href="#/Profile">
                  <FontAwesomeIcon icon={faMountainCity} /> Family Fun{" "}
                </Nav.Link>
                <Nav.Link href="#/Profile">
                  <FontAwesomeIcon icon={faPersonHiking} /> Parent Clubs{" "}
                </Nav.Link>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Navbar.Brand className="ms-4" href="#/Profile">
              <img
                alt=""
                src="./APParent_Logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              APParent
            </Navbar.Brand>
            <Form className="d-flex ms-auto">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 searchbar"
                aria-label="Search"
              />
            </Form>
            <Nav.Link className="me-5 ms-auto" href="#/CareMap">
              <FontAwesomeIcon className="icons" icon={faMapLocationDot} />
            </Nav.Link>
            <Nav.Link className="me-5" href="#/Forum">
              <FontAwesomeIcon className="icons" icon={faBullhorn} />
            </Nav.Link>
            <Nav className="me-5">
              <NavDropdown
                className="me-5"
                title={<FontAwesomeIcon className="icons" icon={faUser} />}
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item href="#/Profile">Home</NavDropdown.Item>
                <NavDropdown.Item href="#/About">About</NavDropdown.Item>
                <NavDropdown.Item href="#/Contact">Contact Us</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#/login">Logout</NavDropdown.Item>{" "}
                {/* todo: handleLogout */}
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
