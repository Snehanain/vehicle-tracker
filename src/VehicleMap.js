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

function VehicleMap({ vehicles, mode }) { // Ensure mode is still accepted as a prop
  const lightMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  // Use the environment variable for the API key
  // This variable will be set in the AWS Amplify Console
  const STADIA_API_KEY = process.env.REACT_APP_STADIA_API_KEY;

  // Construct the dark map URL with the API key
  const darkMapUrl = `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${STADIA_API_KEY}`;


  return (
    <MapContainer center={[12.97, 77.59]} zoom={13} style={{ height: '90vh', flex: 1 }}>
      {/* Conditionally apply the map URL based on mode */}
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