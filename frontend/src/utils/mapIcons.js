import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";

// Source Marker
export const sourceIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [40, 40],
});

// Stop Marker
export const stopIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  iconSize: [35, 35],
});

// Destination Marker
export const destinationIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [40, 40],
});

// Moving Bus Marker
export const busIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="bus-marker">
      <FontAwesomeIcon icon={faBus} />
    </div>
  ),
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});