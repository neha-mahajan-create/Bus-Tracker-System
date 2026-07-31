import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import {
  FaBullseye,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "../styles/about.css";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}

      <section className="about-hero">

        <Container>

          <h1>About BusTracker Pro</h1>

          <p>
            Building smarter transportation through technology,
            simplicity and innovation.
          </p>

        </Container>

      </section>

      {/* About Project */}

      <section className="about-content">

        <Container>

          <Row className="align-items-center g-5">

            <Col lg={6}>

              <img
                src="/images/about-bus.png"
                alt="BusTracker"
                className="img-fluid about-image"
              />

            </Col>

            <Col lg={6}>

              <h2>Smart Bus Management Platform</h2>

              <p>

                BusTracker Pro is a modern transportation management
                platform developed to simplify bus operations for both
                administrators and passengers.

              </p>

              <p>

                The platform provides secure authentication,
                efficient bus and route management,
                interactive route visualization,
                and a dedicated feedback system
                through an intuitive and responsive interface.

              </p>

              <Button
                as={Link}
                to="/services"
                variant="primary"
              >
                Explore Services
              </Button>

            </Col>

          </Row>

        </Container>

      </section>

      {/* Mission Vision */}

      <section className="mission-section">

        <Container>

          <Row className="g-4">

            <Col lg={6}>

              <Card className="mission-card">

                <Card.Body>

                  <FaBullseye className="mission-icon" />

                  <h3>Our Mission</h3>

                  <p>

                    To simplify public transportation by providing
                    secure, efficient and user-friendly digital
                    management solutions.

                  </p>

                </Card.Body>

              </Card>

            </Col>

            <Col lg={6}>

              <Card className="mission-card">

                <Card.Body>

                  <FaRocket className="mission-icon" />

                  <h3>Our Vision</h3>

                  <p>

                    To build an intelligent transportation platform
                    that enhances operational efficiency and
                    improves passenger experience.

                  </p>

                </Card.Body>

              </Card>

            </Col>

          </Row>

        </Container>

      </section>

      {/* Why Choose */}

      <section className="choose-section">

        <Container>

          <h2 className="text-center mb-5">
            Why Choose BusTracker Pro?
          </h2>

          <Row>

            <Col lg={6}>

              <ul className="feature-list">

                <li>
                  <FaCheckCircle />
                  Secure Role-Based Authentication
                </li>

                <li>
                  <FaCheckCircle />
                  Interactive Route Map
                </li>

                <li>
                  <FaCheckCircle />
                  Bus Management
                </li>

                <li>
                  <FaCheckCircle />
                  Route Management
                </li>

              </ul>

            </Col>

            <Col lg={6}>

              <ul className="feature-list">

                <li>
                  <FaCheckCircle />
                  Admin Dashboard
                </li>

                <li>
                  <FaCheckCircle />
                  Passenger Feedback System
                </li>

                <li>
                  <FaCheckCircle />
                  Responsive Design
                </li>

                <li>
                  <FaCheckCircle />
                  Modern User Interface
                </li>

              </ul>

            </Col>

          </Row>

        </Container>

      </section>

      {/* Technology */}

      <section className="technology-section">

        <Container>

          <h2 className="text-center mb-5">

            Technology Stack

          </h2>

          <div className="tech-container">

            <Badge bg="primary">React.js</Badge>

            <Badge bg="primary">Node.js</Badge>

            <Badge bg="primary">Express.js</Badge>

            <Badge bg="primary">MongoDB</Badge>

            <Badge bg="primary">Leaflet</Badge>

            <Badge bg="primary">Bootstrap</Badge>

            <Badge bg="primary">JWT</Badge>

            <Badge bg="primary">REST API</Badge>

          </div>

        </Container>

      </section>

      {/* Future */}

      <section className="future-section">

        <Container>

          <h2 className="text-center mb-5">

            Future Roadmap

          </h2>

          <Row className="g-4">

            <Col lg={6}>

              <Card className="roadmap-card">

                <Card.Body>

                  <h4>Version 1.0 ✅</h4>

                  <ul>

                    <li>Bus Management</li>

                    <li>Route Management</li>

                    <li>Authentication</li>

                    <li>Feedback System</li>

                    <li>Interactive Route Maps</li>

                  </ul>

                </Card.Body>

              </Card>

            </Col>

            <Col lg={6}>

              <Card className="roadmap-card">

                <Card.Body>

                  <h4>Upcoming Enhancements 🚀</h4>

<ul>

  <li>Real-Time GPS Bus Tracking</li>

  <li>Google Maps Route Visualization</li>

  <li>Animated Live Bus Movement</li>

  <li>Improved Dashboard Analytics</li>

  <li>Enhanced User Experience & Performance</li>

</ul>

                </Card.Body>

              </Card>

            </Col>

          </Row>

        </Container>

      </section>

    </div>
  );
}

export default About;