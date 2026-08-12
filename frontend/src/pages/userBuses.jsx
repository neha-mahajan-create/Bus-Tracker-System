import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  Card,
  Badge,
  Form,
  Button,
} from "react-bootstrap";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getBuses,
  searchBuses,
} from "../services/busService";



function UserBuses() {

  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState("");

   const navigate = useNavigate();

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {

    try {

      const res = await getBuses();

      setBuses(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSearch = async (e) => {

    const value = e.target.value;

    setSearch(value);

    if (value === "") {

      loadBuses();

      return;

    }

    try {

      const res = await searchBuses(value);

      setBuses(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSelectBus = (bus) => {

  localStorage.setItem(
    "selectedBus",
    JSON.stringify(bus)
  );

  alert("Bus Selected Successfully");

  navigate("/dashboard");

};
  return (

    <DashboardLayout>

      <Container fluid>

        <Card className="shadow p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3>Available Buses</h3>

            <Badge bg="primary">

              {buses.length} Buses

            </Badge>

          </div>

          <Form.Control
            placeholder="Search Bus..."
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

                <th>Bus Number</th>

                <th>Bus Name</th>

                <th>Route</th>

                <th>Status</th>

                <th>Select</th>

              </tr>

            </thead>

            <tbody>

              {buses.map((bus) => (

                <tr key={bus._id}>

                  <td>{bus.busNumber}</td>

                  <td>{bus.busName}</td>

                  <td>{bus.route}</td>

                  <td>

                    <Badge
                      bg={
                        bus.status === "Active"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {bus.status}
                    </Badge>

                  </td>

                  <td className="text-center">


                    <Button
  variant="outline-success"
  className="select-btn"
  onClick={() => handleSelectBus(bus)}
>
   Select
</Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

        </Card>

      </Container>

    </DashboardLayout>

  );

}

export default UserBuses;