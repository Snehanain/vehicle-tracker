import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon paths for React build
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// IMPORTANT: Ensure VehicleMap accepts 'mode' as a prop
function VehicleMap({ vehicles, mode }) {
  const lightMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  // Access the API key from environment variables
  // This variable must be set in your AWS Amplify Console (as discussed before)
  const STADIA_API_KEY = process.env.REACT_APP_STADIA_API_KEY;

  // Construct the dark map URL using the API key
  const darkMapUrl = `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${STADIA_API_KEY}`;


  return (
    <MapContainer center={[12.97, 77.59]} zoom={13} style={{ height: '90vh', flex: 1 }}>
      {/* Conditionally render TileLayer based on the 'mode' prop */}
      <TileLayer url={mode === 'dark' ? darkMapUrl : lightMapUrl} />
      {vehicles.map(v => (
        <Marker
          key={v["vehicle-id"]}
          position={[v.latitude, v.longitude]}
        >
          <Popup>
            <b>ID:</b> {v["vehicle-id"]}<br/>
            <b>Speed:</b> {v.speed.toFixed(1)} km/h<br/>
            <b>Alert:</b> {v.alert_status || 'None'}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default VehicleMap;