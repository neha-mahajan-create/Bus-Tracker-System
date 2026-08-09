import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import BusForm from "../components/BusForm";
import { addBus } from "../services/busService";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBus,
  FaUsers,
  FaRoute,
  FaCommentDots,
  FaPlus,
  FaEye,
} from "react-icons/fa";

import { Row, Col, Card, Button } from "react-bootstrap";
import "../styles/admin.css";
import JourneyForm from "../components/JourneyForm";
import { addRoute } from "../services/journeyService";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalBuses: 0,
    totalUsers: 0,
    totalRoutes: 0,
    totalFeedback: 0,
  });
  const [showModal, setShowModal] = useState(false);

  const [selectedBus, setSelectedBus] = useState(null);

  const [showRouteModal, setShowRouteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activities, setActivities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
  fetchDashboardStats();
  fetchActivities();
}, []);
  const fetchDashboardStats = async () => {
    try {

      const res = await axios.get(
        "https://bus-tracker-system.onrender.com/api/dashboard/stats"
      );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }
  };
  const fetchActivities = async () => {
  try {

    const res = await axios.get(
      "https://bus-tracker-system.onrender.com/api/activities"
    );

    setActivities(res.data);

  } catch (error) {

    console.log(error);

  }
};
  const openAddBus = () => {
  setSelectedBus(null);
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
};

const saveBus = async (bus) => {
  try {

    await addBus(bus);

    alert("Bus Added Successfully");

    setShowModal(false);

    fetchDashboardStats();
    fetchActivities();

  } catch (error) {

    alert(error.response?.data?.message || "Failed to add bus");

  }
};
const openAddRoute = () => {

  setSelectedRoute(null);

  setShowRouteModal(true);

};

const closeRouteModal = () => {

  setShowRouteModal(false);

};

const saveRoute = async (route) => {

  try {

    await addRoute(route);

    alert("Route Added Successfully");

    setShowRouteModal(false);

    fetchDashboardStats();
    fetchActivities();

  } catch (error) {

    alert(error.response?.data?.message || "Failed to add route");

  }

};

  return (
    <DashboardLayout>

      <h2 className="mb-4">Admin Dashboard</h2>

      <Row>

        <Col md={6} lg={3}>
          <DashboardCard
            title="Total Buses"
            value={stats.totalBuses}
            icon={<FaBus size={35} />}
            color="#0d6efd"
          />
        </Col>

        <Col md={6} lg={3}>
          <DashboardCard
            title="Users"
            value={stats.totalUsers}
            icon={<FaUsers size={35} />}
            color="#198754"
          />
        </Col>

        <Col md={6} lg={3}>
          <DashboardCard
            title="Routes"
            value={stats.totalRoutes}
            icon={<FaRoute size={35} />}
            color="#ffc107"
          />
        </Col>

        <Col md={6} lg={3}>
          <DashboardCard
            title="Feedback"
            value={stats.totalFeedback}
            icon={<FaCommentDots size={35} />}
            color="#dc3545"
          />
        </Col>

      </Row>

      <Row className="mt-4">

        <Col lg={8}>

          <Card className="shadow-sm border-0">

            <Card.Body>

              <h4>Recent Activities</h4>

              <hr />

              <p>
               🚌{" "}
              {activities.latestBus
               ? `${activities.latestBus.busNumber} added`
                    : "No buses added yet"}
                    </p>

                    <p>
              👤{" "}
             {activities.latestUser
             ? `${activities.latestUser.name} registered`
             : "No users registered"}
              </p>

            <p>
            🛣{" "}
            {activities.latestRoute
            ? `${activities.latestRoute.source} → ${activities.latestRoute.destination}`
            : "No routes added"}
            </p>

            <p>
            💬{" "}
           {activities.latestFeedback
            ? `Feedback by ${activities.latestFeedback.user?.name}`
            : "No feedback received"}
            </p>

            </Card.Body>

          </Card>

        </Col>

        <Col lg={4}>

          <Card className="shadow-sm border-0">

            <Card className="shadow-sm border-0">

  <Card.Body>

    <h4>Quick Actions</h4>

    <hr />

    {/* Add Bus */}
    <Button
      className="w-100 mb-3"
      onClick={openAddBus}
    >
      <FaPlus /> Add Bus
    </Button>

    {/* Manage Buses */}
    <Button
  variant="success"
  className="w-100 mb-3"
  onClick={openAddRoute}
>
  <FaRoute /> Add Route
</Button>

      {  /* Manage Users */}
         <Button
         variant="warning"
         className="w-100"
         onClick={() => navigate("/users")}
        >
        <FaUsers /> Manage Users
        </Button>

         </Card.Body>

          </Card>

          </Card>

        </Col>

      </Row>

      <BusForm
      show={showModal}
      handleClose={closeModal}
      handleSave={saveBus}
      busData={selectedBus}
      />

      <JourneyForm
      show={showRouteModal}
      handleClose={closeRouteModal}
      handleSave={saveRoute}
      routeData={selectedRoute}
     />

    </DashboardLayout>
  );
}

export default AdminDashboard;