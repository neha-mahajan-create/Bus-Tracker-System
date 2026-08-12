import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import "../styles/journeyForm.css";

function JourneyForm({
  show,
  handleClose,
  handleSave,
  routeData,
}) {

  const [route, setRoute] = useState({
    source: "",
    destination: "",
    stops: "",
    distance: "",
    estimatedTime: "",
    status: "Active",
  });

  useEffect(() => {

    if (routeData) {

      setRoute({
        source: routeData.source,
        destination: routeData.destination,
        stops: routeData.stops.join(", "),
        distance: routeData.distance,
        estimatedTime: routeData.estimatedTime,
        status: routeData.status,
      });

    } else {

      setRoute({
        source: "",
        destination: "",
        stops: "",
        distance: "",
        estimatedTime: "",
        status: "Active",
      });

    }

  }, [routeData]);

  const handleChange = (e) => {

    setRoute({
      ...route,
      [e.target.name]: e.target.value,
    });

  };

  const submitForm = () => {

    const routeToSave = {
      ...route,
      stops: route.stops
        .split(",")
        .map((stop) => stop.trim())
        .filter((stop) => stop !== ""),
    };

    handleSave(routeToSave);

  };

  return (

    <Modal
      show={show}
      onHide={handleClose}
      centered
    >

      <Modal.Header closeButton>

        <Modal.Title>

          {routeData ? "Update Route" : "Add Route"}

        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <Form>

          <Form.Group className="mb-3">

            <Form.Label>Source</Form.Label>

            <Form.Control
              type="text"
              name="source"
              value={route.source}
              onChange={handleChange}
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Destination</Form.Label>

            <Form.Control
              type="text"
              name="destination"
              value={route.destination}
              onChange={handleChange}
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Stops</Form.Label>

            <Form.Control
              type="text"
              name="stops"
              placeholder="MIDC, Savda, NH6..."
              value={route.stops}
              onChange={handleChange}
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Distance</Form.Label>

            <Form.Control
              type="text"
              name="distance"
              value={route.distance}
              onChange={handleChange}
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Estimated Time</Form.Label>

            <Form.Control
              type="text"
              name="estimatedTime"
              value={route.estimatedTime}
              onChange={handleChange}
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Status</Form.Label>

            <Form.Select
              name="status"
              value={route.status}
              onChange={handleChange}
            >

              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>

            </Form.Select>

          </Form.Group>

        </Form>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={submitForm}
        >
          Save
        </Button>

      </Modal.Footer>

    </Modal>

  );
}

export default JourneyForm;