import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Card,
  Badge,
  Form,
} from "react-bootstrap";

import DashboardLayout from "../layouts/DashboardLayout";
import {
  getRoutes,
  searchRoutes,
  deleteRoute,
  updateRoute,
} from "../services/journeyService";

import JourneyForm from "../components/JourneyForm";

function RouteManagement() {

  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    loadRoutes();
  }, []);

  const loadRoutes = async () => {

  try {

    const res = await getRoutes();

    setRoutes(res.data);

  } catch (error) {

    console.log(error);

  }

};
const handleSearch = async (e) => {

  const value = e.target.value;

  setSearch(value);

  if (value === "") {

    loadRoutes();

    return;

  }

  try {

    const res = await searchRoutes(value);

    setRoutes(res.data);

  } catch (error) {

    console.log(error);

  }

};
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this route?"
  );

  if (!confirmDelete) return;

  try {

    await deleteRoute(id);

    alert("Route deleted successfully.");

    loadRoutes();

  } catch (error) {

    console.log(error);

    alert("Unable to delete route.");

  }

};
const openEdit = (route) => {

  setSelectedRoute(route);

  setShowModal(true);

};

const closeModal = () => {

  setShowModal(false);

  setSelectedRoute(null);

};

const saveRoute = async (route) => {

  try {

    await updateRoute(
      selectedRoute._id,
      route
    );

    alert("Route Updated Successfully");

    closeModal();

    loadRoutes();

  } catch (error) {

    console.log(error);

    alert("Unable to update route");

  }

};

  return (

    <DashboardLayout>

      <Container fluid>

        <Card className="shadow p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3>🛣 Route Management</h3>

            <Badge bg="primary" pill>

              Total Routes : {routes.length}

            </Badge>

          </div>

          <Form.Control
            type="text"
            placeholder="Search by Source or Destination..."
            value={search}
            onChange={handleSearch}
            className="mb-4"
          />

          <Table
            striped
            bordered
            hover
            responsive
          >

            <thead className="table-dark">

              <tr>

                <th>Source</th>

                <th>Destination</th>

                <th>Stops</th>

                <th>Distance</th>

                <th>Estimated Time</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {routes.length > 0 ? (

                routes.map((route) => (

                  <tr key={route._id}>

                    <td>{route.source}</td>

                    <td>{route.destination}</td>

                    <td>{route.stops.join(", ")}</td>

                    <td>{route.distance}</td>

                    <td>{route.estimatedTime}</td>

                    <td>

                      <Badge
                        bg={
                          route.status === "Active"
                            ? "success"
                            : "secondary"
                        }
                      >
                        {route.status}
                      </Badge>

                    </td>

                    <td className="action-links">

                      <span
className="edit-link"
onClick={() => openEdit(route)}
>
Edit
</span>

                      {" | "}

                      <span
                       className="delete-link"
                       onClick={() => handleDelete(route._id)}
                      >
                      Delete
                      </span>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center"
                  >

                    No Routes Found.

                  </td>

                </tr>

              )}

            </tbody>

          </Table>

        </Card>

      </Container>
      <JourneyForm
      show={showModal}
      handleClose={closeModal}
      handleSave={saveRoute}
      routeData={selectedRoute}
    />


    </DashboardLayout>

  );
}

export default RouteManagement;