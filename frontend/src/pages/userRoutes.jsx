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
} from "../services/journeyService";

function UserRoutes() {

  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState("");

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

  return (

    <DashboardLayout>

      <Container fluid>

        <Card className="shadow p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3>Available Routes</h3>

            <Badge bg="primary">

              {routes.length} Routes

            </Badge>

          </div>

          <Form.Control
            type="text"
            placeholder="Search by Source or Destination..."
            className="mb-4"
            value={search}
            onChange={handleSearch}
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

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center"
                  >

                    No Routes Found

                  </td>

                </tr>

              )}

            </tbody>

          </Table>

        </Card>

      </Container>

    </DashboardLayout>

  );

}

export default UserRoutes;