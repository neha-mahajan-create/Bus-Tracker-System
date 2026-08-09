import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { FaBus, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Driverlogin.css";

function DriverLogin() {

  const navigate = useNavigate();

  const [driverName, setDriverName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const loginDriver = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        "https://bus-tracker-system.onrender.com/api/driver/login",
        {
          driverName,
          busNumber,
        }
      );

      localStorage.setItem(
        "driver",
        JSON.stringify(res.data)
      );

      navigate("/driver-tracking");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Driver not found."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="driver-login-page">

      <Container className="d-flex justify-content-center">

        <Card className="driver-login-card">

          <div className="driver-login-header">

            <FaBus />

            <h2>Driver Login</h2>

            <p>
              Login to start live bus tracking
            </p>

          </div>

          <Card.Body className="driver-login-body">

            <Form onSubmit={loginDriver}>

              <Form.Group className="mb-4">

                <Form.Label>

                  <FaUserTie className="me-2" />

                  Driver Name

                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter Driver Name"
                  value={driverName}
                  onChange={(e) =>
                    setDriverName(e.target.value)
                  }
                  required
                />

              </Form.Group>

              <Form.Group className="mb-4">

                <Form.Label>

                  <FaBus className="me-2" />

                  Bus Number

                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter Bus Number"
                  value={busNumber}
                  onChange={(e) =>
                    setBusNumber(e.target.value)
                  }
                  required
                />

              </Form.Group>

              <Button
                type="submit"
                className="driver-login-btn"
                disabled={loading}
              >

                {loading
                  ? "Verifying..."
                  : "Start Journey"}

              </Button>

            </Form>

          </Card.Body>

        </Card>

      </Container>

    </div>

  );

}

export default DriverLogin;