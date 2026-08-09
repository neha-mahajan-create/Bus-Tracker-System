import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

function BusForm({
  show,
  handleClose,
  handleSave,
  busData,
}) {

  const [routes, setRoutes] = useState([]);

  const [form, setForm] = useState({
    busNumber: "",
    busName: "",
    route: "",
    driverName: "",
    currentLocation: "",
    eta: "",
    status: "",
    capacity: "",
  });

  // Load all available routes
  useEffect(() => {

    const loadRoutes = async () => {

      try {

        const res = await axios.get(
          "https://bus-tracker-system.onrender.com/api/journeys"
        );

        setRoutes(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    loadRoutes();

  }, []);

  // Load bus data while editing
  useEffect(() => {

    if (busData) {

      setForm(busData);

    } else {

      setForm({
        busNumber: "",
        busName: "",
        route: "",
        driverName: "",
        currentLocation: "",
        eta: "",
        status: "",
        capacity: "",
      });

    }

  }, [busData]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const submit = () => {

    handleSave(form);

  };

  return (

    <Modal
      show={show}
      onHide={handleClose}
      centered
    >

      <Modal.Header closeButton>

        <Modal.Title>

          {busData ? "Update Bus" : "Add Bus"}

        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <Form>

          <Form.Control
            className="mb-2"
            placeholder="Bus Number"
            name="busNumber"
            value={form.busNumber}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-2"
            placeholder="Bus Name"
            name="busName"
            value={form.busName}
            onChange={handleChange}
          />

          {/* Route Dropdown */}
          <Form.Select
            className="mb-2"
            name="route"
            value={form.route}
            onChange={handleChange}
          >

            <option value="">
              Select Route
            </option>

            {routes.map((route) => (

              <option
                key={route._id}
                value={`${route.source} to ${route.destination}`}
              >

                {route.source} → {route.destination}

              </option>

            ))}

          </Form.Select>

          <Form.Control
            className="mb-2"
            placeholder="Driver Name"
            name="driverName"
            value={form.driverName}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-2"
            placeholder="Current Location"
            name="currentLocation"
            value={form.currentLocation}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-2"
            placeholder="ETA"
            name="eta"
            value={form.eta}
            onChange={handleChange}
          />

          <Form.Select
            className="mb-2"
            name="status"
            value={form.status}
            onChange={handleChange}
          >

            <option value="">
              Select Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

            <option value="Maintenance">
              Maintenance
            </option>

          </Form.Select>

          <Form.Control
            className="mb-2"
            placeholder="Capacity"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
          />

        </Form>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button onClick={submit}>
          Save
        </Button>

      </Modal.Footer>

    </Modal>

  );

}

export default BusForm;