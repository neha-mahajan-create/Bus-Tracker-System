import { useEffect, useState } from "react";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "../styles/map.css";

import {
  sourceIcon,
  stopIcon,
  destinationIcon,
  busIcon,
} from "../utils/mapIcons";

// Fix Leaflet default marker issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBounds({ roadPath }) {

  const map = useMap();

  useEffect(() => {

    if (roadPath.length < 2) return;

    const bounds = L.latLngBounds(
      roadPath.map(point => [point.lat, point.lng])
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
    });

  }, [roadPath, map]);

  return null;
}

function RouteMap({ onBusUpdate }) {

  const [markers, setMarkers] = useState([]);
  const [roadPath, setRoadPath] = useState([]);
  const [busPosition, setBusPosition] = useState(null);
  


  useEffect(() => {
    loadRoute();
  }, []);

  const getCoordinates = async (place) => {

    const res = await axios.get(
      `http://localhost:5001/api/geocode?place=${encodeURIComponent(place)}`
    );

    return {
      lat: res.data.lat,
      lng: res.data.lng,
      name: place,
    };

  };

  const loadRoute = async () => {

    try {

      const selectedBus = JSON.parse(
        localStorage.getItem("selectedBus")
      );

      if (!selectedBus) return;

      const journeyRes = await axios.get(
        `http://localhost:5001/api/map?route=${encodeURIComponent(
          selectedBus.route
        )}`
      );

      const journey = journeyRes.data;

      const places = [
        journey.source,
        ...journey.stops,
        journey.destination,
      ];

      const coords = [];

      for (const place of places) {

        const point = await getCoordinates(place);

        coords.push(point);

      }

      setMarkers(coords);

      const osrmRes = await axios.post(
        "http://localhost:5001/api/road-route",
        {
          coordinates: coords.map(point => [
            point.lng,
            point.lat,
          ]),
        }
      );

      const route = osrmRes.data.map(point => ({
        lat: point[1],
        lng: point[0],
      }));

      setRoadPath(route);

      // Place bus at starting point
// Place bus at starting point
if (route.length > 0) {

    // Keep the bus at the source until live GPS arrives
    setBusPosition(route[0]);

    if (onBusUpdate) {

        onBusUpdate({

            currentLocation: coords[0].name,

        });

    }

}
    } catch (error) {

      console.log(error);

    }

  };
useEffect(() => {

    const selectedBus = JSON.parse(
        localStorage.getItem("selectedBus")
    );

    if (!selectedBus) {

        console.log("No Selected Bus Found");

        return;

    }

    console.log("Tracking Bus:", selectedBus.busNumber);

    const interval = setInterval(async () => {

        try {

            const res = await axios.get(
                `http://localhost:5001/api/driver/location/${selectedBus.busNumber}`
            );

            console.log("========== LIVE GPS ==========");
            console.log("Selected Bus:", selectedBus.busNumber);
            console.log("Response:", res.data);

            const liveBus = {

                lat: Number(res.data.latitude),
                lng: Number(res.data.longitude),

            };

            console.log("Bus Position:", liveBus);

            setBusPosition(liveBus);

            // Find nearest stop
            let nearestStop = "Travelling";

            let minimumDistance = Number.MAX_VALUE;

            markers.forEach((stop) => {

                const distance = Math.sqrt(

                    Math.pow(stop.lat - liveBus.lat, 2) +
                    Math.pow(stop.lng - liveBus.lng, 2)

                );

                if (distance < minimumDistance) {

                    minimumDistance = distance;
                    nearestStop = stop.name;

                }

            });

            if (onBusUpdate) {

                onBusUpdate({

                    currentLocation: nearestStop,

                });

            }

        } catch (error) {

            console.log("========== LIVE GPS ERROR ==========");

            if (error.response) {

                console.log(error.response.data);

            } else {

                console.log(error.message);

            }

        }

    }, 2000);

    return () => clearInterval(interval);

}, [markers, onBusUpdate]);
  return (

    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={6}
      style={{
        height: "450px",
        width: "100%",
        borderRadius: "12px",
      }}
    >

      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Source / Stops / Destination */}

      {markers.map((point, index) => {

        let icon = stopIcon;

        if (index === 0)
          icon = sourceIcon;

        if (index === markers.length - 1)
          icon = destinationIcon;

        return (

          <Marker
            key={index}
            position={[point.lat, point.lng]}
            icon={icon}
          >

            <Popup>

              <strong>{point.name}</strong>

            </Popup>

          </Marker>

        );

      })}

      {/* Bus Marker */}

      {busPosition && (

        <Marker
          position={[busPosition.lat, busPosition.lng]}
          icon={busIcon}
        >

          <Popup>

            <strong>🚌 Bus Tracking</strong>

            <br />

            Bus is ready to start the journey.

          </Popup>

        </Marker>

      )}

      {/* Route */}

      {roadPath.length > 1 && (

        <>
          <Polyline
            positions={roadPath.map(point => [
              point.lat,
              point.lng,
            ])}
            pathOptions={{
              color: "#0d6efd",
              weight: 6,
            }}
          />

          <FitBounds roadPath={roadPath} />

        </>

      )}

    </MapContainer>

  );

}

export default RouteMap;