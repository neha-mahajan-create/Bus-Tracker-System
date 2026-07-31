import { Container, Row, Col } from "react-bootstrap";
import {
  FaBus,
  FaRoute,
  FaUserShield
} from "react-icons/fa";

import NavigationBar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

import "../styles/home.css";

function Home() {
  return (
    <>
      <NavigationBar />

      <Hero />

      <Container className="my-5">

        <h2 className="text-center mb-5">
          Why Choose BusTracker Pro?
        </h2>

        <Row>

          <Col md={4} className="mb-4">

            <FeatureCard
              icon={<FaBus />}
              title="Bus Management"
              text="Manage buses with ease."
            />

          </Col>

          <Col md={4} className="mb-4">

            <FeatureCard
              icon={<FaRoute />}
              title="Route Tracking"
              text="Track bus routes efficiently."
            />

          </Col>

          <Col md={4} className="mb-4">

            <FeatureCard
              icon={<FaUserShield />}
              title="Secure Login"
              text="JWT secured authentication."
            />

          </Col>

        </Row>

      </Container>

      <Footer />
    </>
  );
}

export default Home;