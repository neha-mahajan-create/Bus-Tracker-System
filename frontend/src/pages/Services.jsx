import { Container, Row, Col } from "react-bootstrap";

import {
  FaBusAlt,
  FaMapMarkerAlt,
  FaRoute,
  FaUserShield,
  FaChartLine,
  FaCommentDots,
} from "react-icons/fa";

import ServiceCard from "../components/ServiceCard";
import "../styles/services.css";

function Services() {
  return (
    <section className="services-section">

      <Container>

        {/* Heading */}

        <div className="services-heading">

          <h2>Our Services</h2>

          <p>
            Intelligent solutions designed to make public transportation
            smarter, faster and more efficient.
          </p>

        </div>

        {/* Cards */}

        <Row className="g-4">

  <Col lg={4} md={6}>
    <ServiceCard
      icon={<FaBusAlt />}
      title="Bus Management"
      description="Add, update and manage buses with route details, capacity, status and estimated arrival time."
    />
  </Col>

  <Col lg={4} md={6}>
    <ServiceCard
      icon={<FaRoute />}
      title="Route Management"
      description="Create, edit and organize routes with multiple stops, distance and estimated travel time."
    />
  </Col>

  <Col lg={4} md={6}>
    <ServiceCard
      icon={<FaMapMarkerAlt />}
      title="Interactive Route Map"
      description="Visualize complete bus journeys on an interactive OpenStreetMap with dynamic route display."
    />
  </Col>

  <Col lg={4} md={6}>
    <ServiceCard
      icon={<FaUserShield />}
      title="Secure Authentication"
      description="Role-based authentication with separate login and registration for administrators and passengers."
    />
  </Col>

  <Col lg={4} md={6}>
    <ServiceCard
      icon={<FaCommentDots />}
      title="Feedback Management"
      description="Passengers can submit feedback while administrators review and manage responses efficiently."
    />
  </Col>

  <Col lg={4} md={6}>
    <ServiceCard
      icon={<FaChartLine />}
      title="Admin Dashboard"
      description="View buses, routes, users and feedback through a centralized dashboard with real-time statistics."
    />
  </Col>

</Row>

      </Container>

    </section>
  );
}

export default Services;