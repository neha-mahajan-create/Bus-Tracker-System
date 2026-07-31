import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import RouteMap from "../components/RouteMap";
import {
  FaBus,
  FaRoute,
  FaMapMarker,
  FaCommentDots,
} from "react-icons/fa";

import { Row, Col } from "react-bootstrap";

import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {

  const [latestFeedback, setLatestFeedback] = useState(null);

  const [selectedBus, setSelectedBus] = useState(null);
  const [liveTracking, setLiveTracking] = useState({
  currentLocation: "--",
});
  useEffect(() => {

    fetchLatestFeedback();

    const bus = JSON.parse(localStorage.getItem("selectedBus"));

    setSelectedBus(bus);
    if (bus) {
   setLiveTracking({
    currentLocation: bus.currentLocation,
  });
}

  }, []);

  const fetchLatestFeedback = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:5001/api/feedback/user/${user.id}`
      );

      setLatestFeedback(res.data || null);

    } catch (error) {

      console.log(error);

      setLatestFeedback(null);

    }

  };

  return (

    <DashboardLayout>

      <h2 className="mb-4">

        User Dashboard

      </h2>

      <Row>

        <Col md={6} lg={3}>

          <DashboardCard
            title="Bus Name"
            value={
              selectedBus
                ? selectedBus.busName
                : "Select Bus"
            }
            icon={<FaBus size={35} />}
            color="#0d6efd"
          />

        </Col>

        <Col md={6} lg={3}>

          <DashboardCard
            title="Your Route"
            value={
              selectedBus
                ? selectedBus.route
                : "--"
            }
            icon={<FaRoute size={35} />}
            color="#198754"
          />

        </Col>

        <Col md={6} lg={3}>

          <DashboardCard
            title="Destination Arrival"
            value={
              selectedBus
                ? selectedBus.eta
                : "Not Available"
            }
            icon={<FaMapMarker size={35} />}
            color="#ffc107"
          />

        </Col>

        <Col md={6} lg={3}>

          <DashboardCard
            title="Latest Feedback"
            icon={<FaCommentDots size={35} />}
            color="#dc3545"
          >

            {latestFeedback ? (

              <div>

                <h5 style={{ color: "#ffc107" }}>

                  {"⭐".repeat(latestFeedback.rating)}

                </h5>

                <p>

                  {latestFeedback.message}

                </p>

                <small>

                  Status :

                  <b
                    style={{
                      color:
                        latestFeedback.status === "Reviewed"
                          ? "green"
                          : "orange",
                    }}
                  >

                    {" "}

                    {latestFeedback.status}

                  </b>

                </small>

              </div>

            ) : (

              <p>No feedback submitted yet.</p>

            )}
            

          </DashboardCard>

        </Col>

      </Row>

          <Row className="mt-4">

  {/* Map */}
  <Col lg={8}>

    <div className="map-card">

      <h4>Your Bus Route</h4>

      <RouteMap
        onBusUpdate={setLiveTracking}
     />
    </div>

  </Col>

  {/* Bus Information */}
  <Col lg={4}>

    <div className="map-card">

      <h4>Bus Information</h4>

      <hr />

      {selectedBus ? (

        <>
          <p><strong>Bus No:</strong> {selectedBus.busNumber}</p>

          <p><strong>Driver:</strong> {selectedBus.driverName}</p>

          <p><strong>Status:</strong> {selectedBus.status}</p>

          <p><strong>Capacity:</strong> {selectedBus.capacity}</p>

          <p>
  <strong>Current Location:</strong>{" "}
  {liveTracking.currentLocation}
</p>

<p>
  <strong>ETA:</strong>{" "}
  {selectedBus.eta}
</p>
  
        </>

      ) : (

        <p>Please select a bus from the Buses page.</p>

      )}

    </div>

  </Col>

</Row>

    </DashboardLayout>

  );

}

export default UserDashboard;