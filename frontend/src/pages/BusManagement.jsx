import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Card,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
 import {
  getBuses,
  searchBuses,
  deleteBus,
  updateBus,
} from "../services/busService";
 import BusForm from "../components/BusForm";
function BusManagement() {

  const [buses, setBuses] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [selectedBus, setSelectedBus] = useState(null);

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
  const handleEdit = (bus) => {

  setSelectedBus(bus);

  setShowModal(true);

};

const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this bus?"
  );

  if (!confirmDelete) return;

  try {

    await deleteBus(id);

    alert("Bus deleted successfully.");

    loadBuses();

  } catch (error) {

    console.log(error);

    alert("Unable to delete bus.");

  }

};
const closeModal = () => {

  setShowModal(false);

  setSelectedBus(null);

};

const saveUpdatedBus = async (updatedBus) => {

  try {

    await updateBus(selectedBus._id, updatedBus);

    alert("Bus Updated Successfully");

    setShowModal(false);

    loadBuses();

  } catch (error) {

    console.log(error);

    alert("Update Failed");

  }

};
  return (

    <DashboardLayout>

      <Container fluid>

        <Card className="shadow p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3>🚌 Bus Management</h3>

            <Badge bg="primary" pill>

              Total Buses : {buses.length}

            </Badge>

          </div>

          <Form.Control
            type="text"
            placeholder="Search by Bus Number, Bus Name or Route..."
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

                <th>Bus Number</th>

                <th>Bus Name</th>

                <th>Route</th>

                <th>Driver</th>

                <th>Status</th>

                <th>Capacity</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {buses.length > 0 ? (

                buses.map((bus) => (

                  <tr key={bus._id}>

                    <td>{bus.busNumber}</td>

                    <td>{bus.busName}</td>

                    <td>{bus.route}</td>

                    <td>{bus.driverName}</td>

                    <td>

                      <Badge
                        bg={
                          bus.status === "Active"
                            ? "success"
                            : bus.status === "Maintenance"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {bus.status}
                      </Badge>

                    </td>

                    <td>{bus.capacity}</td>

                  <td className="action-links">

                    <span
                    className="edit-link"
                    onClick={() => handleEdit(bus)}
                    >
                    Edit
                    </span>

                     {" | "}

                   <span
                    className="delete-link"
                    onClick={() => handleDelete(bus._id)}
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

                    No buses found.

                  </td>

                </tr>

              )}

            </tbody>

          </Table>

        </Card>

      </Container>

      <BusForm
     show={showModal}
     handleClose={closeModal}
     handleSave={saveUpdatedBus}
     busData={selectedBus}
    />

    </DashboardLayout>

  );
}

export default BusManagement;