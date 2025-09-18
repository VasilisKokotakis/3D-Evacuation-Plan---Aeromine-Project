import React, { useState } from 'react';
import CityScene from './components/CityScene';
import './App.css';

function App() {
  const gltfPath = '/final.glb';

  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [showFire, setShowFire] = useState<boolean>(false);
  const [resetCameraTrigger, setResetCameraTrigger] = useState<boolean>(false);

  const cityLocations = ['OTE Building', 'Road Point 1', 'Road Point 2', 'OAKA'];


  const handlePlaceFire = () => {
    if (selectedRoom) {
      setShowFire(true);
      alert(`Fire placed in ${selectedRoom}!`);
    } else {
      alert('Please select a location first!');
    }
  };

  const handleResetCamera = () => {
    setResetCameraTrigger(true);
    setTimeout(() => setResetCameraTrigger(false), 100);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <CityScene
        gltfPath={gltfPath}
        showFire={showFire}
        selectedLocation={selectedRoom}
        resetCamera={resetCameraTrigger}
      />

      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <h2>City Location Controls</h2>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', color: 'black' }}
        >
          <option value="">Select a Location</option>
          {cityLocations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        <button
          onClick={handlePlaceFire}
          disabled={!selectedRoom}
          style={{
            padding: '10px 15px',
            background: '#ff4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: selectedRoom ? 'pointer' : 'not-allowed'
          }}
        >
          Place Fire
        </button>

        <button
          onClick={handleResetCamera}
          style={{
            padding: '10px 15px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Reset View
        </button>

      </div>

      {/* --- UPDATED: Copyright Tag for a nicer look --- */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        color: 'rgba(235, 219, 4, 0.75)', // Slightly less transparent white
        fontSize: '50px',
        fontWeight: 'bold', // Make it a bit stronger
        textShadow: '1px 1px 3px rgba(0,0,0,0.5)', // Subtle black shadow for pop
        zIndex: 1000,
        pointerEvents: 'none' // Allows mouse events to pass through to the 3D canvas
      }}>
        Copyright © All Rights Reserved AEROMINE
      </div>
      {/* --- END UPDATED --- */}

    </div>
  );
}

export default App;