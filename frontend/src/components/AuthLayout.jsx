import { Container, Row, Col } from "react-bootstrap";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <Container fluid>
        <Row className="min-vh-100">

          {/* Left Side */}
          <Col
            lg={6}
            className="d-none d-lg-flex flex-column justify-content-center align-items-center auth-left"
          >
            <h1 className="display-4 fw-bold text-white">
              🚌 BusTracker Pro
            </h1>

            <p className="lead text-white text-center mt-3">
              Smart Bus Management System
            </p>

            <p className="text-light text-center px-5">
              Track buses, manage routes, and simplify transportation with one modern platform.
            </p>
          </Col>

          {/* Right Side */}
          <Col
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="auth-box">

              <h2 className="fw-bold mb-2">
                {title}
              </h2>

              <p className="text-muted mb-4">
                {subtitle}
              </p>

              {children}

            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default AuthLayout;