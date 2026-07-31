import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import "../styles/contact.css";

import { useState } from "react";
import { sendContactMessage } from "../services/contactService";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await sendContactMessage(formData);

      alert("✅ Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong!"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="contact-page">

      {/* Hero */}

      <section className="contact-hero">

        <Container>

          <h1>Contact Us</h1>

          <p>
            We'd love to hear from you.
            Feel free to reach out for suggestions,
            collaboration or project discussions.
          </p>

        </Container>

      </section>

      {/* Main */}

      <section className="contact-section">

        <Container>

          <Row className="g-5">

            {/* Left */}

            <Col lg={5}>

              <Card className="contact-info">

                <Card.Body>

                  <h2>Get in Touch</h2>

                  <p>
                    Whether you have a question,
                    suggestion or would like to
                    collaborate, feel free to contact us.
                  </p>

                  <div className="info-item">
                    <FaEnvelope />
                    <span>Nehamahajan7@gmail.com</span>
                  </div>

                  <div className="info-item">
                    <FaPhoneAlt />
                    <span>+91 XXXXXXXXXX</span>
                  </div>

                  <div className="info-item">
                    <FaMapMarkerAlt />
                    <span>Jalgaon, Maharashtra</span>
                  </div>

                  <hr />

                  <div className="social-icons">
                    <FaGithub />
                    <FaLinkedin />
                  </div>

                </Card.Body>

              </Card>

            </Col>

            {/* Right */}

            <Col lg={7}>

              <Card className="contact-form-card">

                <Card.Body>

                  <h2>Send a Message</h2>

                  <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">

                      <Form.Label>Name</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />

                    </Form.Group>

                    <Form.Group className="mb-3">

                      <Form.Label>Email</Form.Label>

                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />

                    </Form.Group>

                    <Form.Group className="mb-3">

                      <Form.Label>Subject</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />

                    </Form.Group>

                    <Form.Group className="mb-4">

                      <Form.Label>Message</Form.Label>

                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Write your message..."
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      />

                    </Form.Group>

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>

                  </Form>

                </Card.Body>

              </Card>

            </Col>

          </Row>

        </Container>

      </section>

      {/* Bottom */}

      <section className="developer-section">

        <Container>

          <h3>
            Let's Build Smarter Transportation Together 🚍
          </h3>

          <p>
            Designed & Developed by
            <strong> Neha Narendra Mahajan</strong>
          </p>

        </Container>

      </section>

    </div>
  );
}

export default Contact;