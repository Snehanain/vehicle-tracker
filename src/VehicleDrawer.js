import React from 'react';
import { TextField, Typography, Button, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';

function VehicleDrawer({ filters, setFilters, vehicles = [], areaQuery, setAreaQuery, handleAreaSearch }) {
  const handleExport = (format) => {
    const dataStr = format === 'csv'
      ? convertToCSV(vehicles)
      : JSON.stringify(vehicles, null, 2);

    const blob = new Blob([dataStr], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vehicle_data.${format}`;
    link.click();
  };

  const convertToCSV = (items) => {
    if (!items.length) return '';
    const header = Object.keys(items[0]).join(',');
    const rows = items.map(v => Object.values(v).join(','));
    return [header, ...rows].join('\n');
  };

  return (
    <div style={{ width: 300, padding: 16 }}>
      <Typography variant="h6" gutterBottom>Search Vehicles</Typography>

      <TextField
        label="Vehicle ID"
        fullWidth
        value={filters.id}
        onChange={(e) => setFilters({ ...filters, id: e.target.value })}
        margin="dense"
      />

      <FormControl component="fieldset" style={{ marginTop: 8 }}>
        <FormLabel component="legend">Alert Type</FormLabel>
        <RadioGroup
          value={filters.alert}
          onChange={(e) => setFilters({ ...filters, alert: e.target.value })}
        >
          <FormControlLabel value="overspeed" control={<Radio />} label="Overspeed" />
          <FormControlLabel value="overturn" control={<Radio />} label="Overturn" />
          <FormControlLabel value="" control={<Radio />} label="None" />
        </RadioGroup>
      </FormControl>

      <TextField
        label="Min Speed"
        type="number"
        fullWidth
        value={filters.speed}
        onChange={(e) => setFilters({ ...filters, speed: e.target.value })}
        margin="dense"
      />

      <Divider style={{ margin: '10px 0' }} />

      <TextField
        label="Search Area"
        fullWidth
        value={areaQuery}
        onChange={(e) => setAreaQuery(e.target.value)}
        margin="dense"
      />
      <Button variant="outlined" fullWidth onClick={handleAreaSearch} style={{ marginTop: 8 }}>
        Search Area
      </Button>

      <Typography variant="subtitle2" style={{ marginTop: 12 }}>
        Results ({vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} found):
      </Typography>

      <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: 4 }}>
        {vehicles.map(v => (
          <Paper
            key={v["vehicle-id"]}
            style={{ padding: '8px', marginBottom: '6px', border: '1px solid #ccc' }}
            elevation={2}
          >
            <Typography variant="body2">
              <b>ID:</b> {v["vehicle-id"]}
            </Typography>
            <Typography variant="body2">
              <b>Speed:</b> {v.speed?.toFixed(1)} km/h
            </Typography>
            <Typography variant="body2">
              <b>Alert:</b> {v.alert_status || 'None'}
            </Typography>
          </Paper>
        ))}
      </div>

      <Divider style={{ margin: '10px 0' }} />

      <Button variant="contained" fullWidth onClick={() => handleExport('csv')} style={{ marginBottom: 4 }}>
        Export CSV
      </Button>
      <Button variant="outlined" fullWidth onClick={() => handleExport('json')}>
        Export JSON
      </Button>
    </div>
  );
}

export default VehicleDrawer;
