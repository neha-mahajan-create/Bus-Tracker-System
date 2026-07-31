import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import busImage from "../assets/Bus.png"; // Add your bus image here

function Hero() {
  return (
    <section className="hero-section">

      <Container>

        <Row className="align-items-center">

          {/* Left Side */}

          <Col lg={6} md={12}>

            <h1 className="hero-title">
              Smart Bus Tracking
              <br />
              & Management System
            </h1>

            <p className="hero-description">
              Manage buses, monitor routes, track journeys and provide
              seamless transportation through one intelligent platform.
            </p>

            <Button
              as={Link}
              to="/about"
              className="hero-btn"
            >
              Learn More
            </Button>

          </Col>

          {/* Right Side */}

          <Col lg={6} md={12} className="text-center">

            <img
              src={busImage}
              alt="Bus"
              className="hero-image"
            />

          </Col>

        </Row>

      </Container>

    </section>
  );
}

export default Hero;