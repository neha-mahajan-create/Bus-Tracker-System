import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useState } from "react";

import RoleSelectionModal from "./RoleSelectionModal";

import "../styles/navbar.css";

function NavigationBar() {

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();

  const openLogin = () => {
    setModalType("login");
    setShowModal(true);
  };

  const openRegister = () => {
    setModalType("register");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="custom-navbar"
        sticky="top"
      >
        <Container>

          {/* Logo */}

          <Navbar.Brand
            as={Link}
            to="/"
            className="logo"
          >
            🚌 BusTracker Pro
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">

            <Nav className="ms-auto align-items-center flex-nowrap">

              <Nav.Link
                as={Link}
                to="/"
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/about"
              >
                About
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/services"
              >
                Services
              </Nav.Link>

              <Nav.Link as={Link} to="/contact">
                 Contact
                </Nav.Link>

              {/* Login Button */}

              <Button
                className="login-btn ms-4"
                onClick={openLogin}
              >
                Login
              </Button>

              {/* Register Button */}

              <Button
                className="register-btn ms-3"
                onClick={openRegister}
              >
                Register
              </Button>
               
              <Button
               className="driver-btn ms-2"
               as={Link}
               to="/driver-login"
              >
             Driver
             </Button>
            </Nav>

          </Navbar.Collapse>

        </Container>

      </Navbar>

      {/* Role Selection Popup */}

      <RoleSelectionModal
        show={showModal}
        handleClose={closeModal}
        type={modalType}
      />

    </>
  );
}

export default NavigationBar;