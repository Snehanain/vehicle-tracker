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

function VehicleMap({ vehicles, mode }) { // Accept mode as a prop
  const lightMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkMapUrl = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"; // Dark mode tile layer URL from the article

  return (
    <MapContainer center={[12.97, 77.59]} zoom={13} style={{ height: '90vh', flex: 1 }}>
      <TileLayer url={mode === 'dark' ? darkMapUrl : lightMapUrl} /> {/* Conditionally apply URL */}
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