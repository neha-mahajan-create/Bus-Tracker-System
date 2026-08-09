import { useState, useEffect } from "react";
import { Container, Card, Button, Badge } from "react-bootstrap";
import {
  FaBus,
  FaMapMarkerAlt,
  FaRoute,
} from "react-icons/fa";
import axios from "axios";

import "../styles/driverTracking.css";

function DriverTracking() {

  const driver = JSON.parse(localStorage.getItem("driver"));

  const [watchId, setWatchId] = useState(null);
  const [sharing, setSharing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("--");

  const startJourney = () => {

    if (!navigator.geolocation) {

      alert("Geolocation is not supported.");

      return;

    }

    const id = navigator.geolocation.watchPosition(

      async (position) => {

        try {

             const response = await axios.put(
            "https://bus-tracker-system.onrender.com/api/driver/location",
            {
             busNumber: driver.bus.busNumber,
              latitude: position.coords.latitude + (Math.random() * 0.001),
              longitude: position.coords.longitude + (Math.random() * 0.001),
            }
            
        );

        console.log("📍 Live Location Updated");

        console.log(response.data);
             setSharing(true);
            setLastUpdated(
            new Date().toLocaleTimeString()
            );

      }       catch (error) {

        console.log("GPS Update Error");

        console.log(error);

       }

      },

     (error) => {

    console.log("GPS Error:", error);

    alert(
        `GPS Error ${error.code}: ${error.message}`
    );

}    ,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }

    );

    setWatchId(id);

   

  };

  const stopJourney = () => {

    if (watchId) {

      navigator.geolocation.clearWatch(watchId);

    }

    setSharing(false);

  };

  useEffect(() => {

    return () => {

      if (watchId) {

        navigator.geolocation.clearWatch(watchId);

      }

    };

  }, [watchId]);

  return (

    <div className="driver-page">

      <Container>

        <Card className="driver-card">

          {/* Header */}

          <div className="driver-header">

            <FaBus />

            <h2>Driver Panel</h2>

            <p>

              Welcome, <strong>{driver.bus.driverName}</strong>

            </p>

          </div>

          {/* Body */}

          <Card.Body>

            <div className="driver-info">

              <h5>

                <FaBus />

                Bus Number :

                <strong>

                  {driver.bus.busNumber}

                </strong>

              </h5>

              <h5>

                <FaRoute />

                Route :

                <strong>

                  {driver.bus.route}

                </strong>

              </h5>

            </div>

            {/* Status */}

            <div className="status-card">

              <h4>

                <FaMapMarkerAlt />

                {" "}Live Tracking Status

              </h4>

              <br />

              {sharing ? (

                <Badge bg="success">

                  ● GPS Connected

                </Badge>

              ) : (

                <Badge bg="secondary">

                  ● Waiting...

                </Badge>

              )}

              <div className="last-update">

                <strong>Last Updated</strong>

                <br />

                {lastUpdated}

              </div>

            </div>

            {/* Buttons */}

            <div className="driver-buttons">

              <Button
    className="start-btn"
    onClick={startJourney}
    disabled={sharing}
>
    START JOURNEY
</Button>

<Button
    className="stop-btn"
    onClick={stopJourney}
    disabled={!sharing}
>
    STOP JOURNEY
</Button>

            </div>

          </Card.Body>

        </Card>

      </Container>

    </div>

  );

}

export default DriverTracking;