import React, { useState, useEffect } from 'react';
import Header from './Header';
import VehicleMap from './VehicleMap';
import VehicleDrawer from './VehicleDrawer';
import axios from 'axios';
import './App.css';



const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({ id: '', alert: '', speed: '' });
  const [areaQuery, setAreaQuery] = useState('');
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState('light');

  useEffect(() => {
    if (!started) return;

    const fetchVehicles = async () => {
      try {
        const response = await axios.get('https://stuxq8cp00.execute-api.eu-north-1.amazonaws.com/fetchdata');
        setVehicles(response.data);
        setFilteredVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicle data', error);
      }
    };

    fetchVehicles();
    const interval = setInterval(fetchVehicles, 60000);
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    let data = vehicles;

    if (filters.id) {
      data = data.filter(v => v['vehicle-id'].toLowerCase().includes(filters.id.toLowerCase()));
    }

    if (filters.alert) {
      data = data.filter(v => v.alert_status && v.alert_status.toLowerCase().includes(filters.alert.toLowerCase()));
    }

    if (filters.speed) {
      data = data.filter(v => v.speed >= parseFloat(filters.speed));
    }

    setFilteredVehicles(data);
  }, [filters, vehicles]);

  const handleAreaSearch = async () => {
    if (!areaQuery) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(areaQuery)}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const bbox = data[0].boundingbox;
      const [south, north, west, east] = bbox.map(Number);

      const areaVehicles = vehicles.filter(v =>
        v.latitude >= south && v.latitude <= north &&
        v.longitude >= west && v.longitude <= east
      );

      setFilteredVehicles(areaVehicles);
    } else {
      alert('Area not found');
    }
  };

  if (!started) {
    return (
      <div className={`start-screen ${mode}`}>
        <div className="start-container">
          <h1>Welcome to Vehicle Monitoring System</h1>
          <p>Monitor vehicle location, speed, and alert status in real-time.</p>
          <button className="start-button" onClick={() => setStarted(true)}>
            Start Vehicle Monitoring
          </button>
        </div>
      </div>
    );
  }

  
 // ... (rest of your App.js code) ...

 return (
  <>
    {/* Header stays outside mode class so it is unaffected */}
    <Header mode={mode} setMode={setMode} />

    {/* Apply mode only to the app-body */}
    <div className={`app-body ${mode}`} style={{ display: 'flex' }}>
      <div className={`side-panel ${mode}`}>
        <VehicleDrawer
          filters={filters}
          setFilters={setFilters}
          vehicles={filteredVehicles}
          areaQuery={areaQuery}
          setAreaQuery={setAreaQuery}
          handleAreaSearch={handleAreaSearch}
        />
      </div>
      <div style={{ flex: 1 }}>
        {/* IMPORTANT: Pass the 'mode' prop to VehicleMap */}
        <VehicleMap vehicles={filteredVehicles} mode={mode} />
      </div>
    </div>
  </>
);
};

export default App;