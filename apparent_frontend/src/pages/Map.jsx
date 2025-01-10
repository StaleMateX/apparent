import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export function Map() {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  const [viewPort, setViewPort] = useState({
    latitude: 40.7700,
    longitude: -111.8380,
    zoom: 14.5,
    width: "100vw",
    height: "100vh"
  });

  const [markerLoc, setMarkerLoc] = useState({
    longitude: -111.8389,
    latitude: 40.7700
  });


  // Handle drag event to update marker location
  const handleDrag = (e) => {
    const newLatitude = e.lngLat.lat;
    const newLongitude = e.lngLat.lng;

    setMarkerLoc({
      latitude: newLatitude,
      longitude: newLongitude
    });

    alert(`New Latitude: ${newLatitude}, New Longitude: ${newLongitude}`);
  };

  const handleSelectedMarker = (e) => {
    //Todo: Implement
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactMapGL
        {...viewPort}
        onMove={(e) => setViewPort(e.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* Other Users */}
        <Marker latitude={40.76362178032912} longitude={-111.83802115993647} color="blue" onClick={handleSelectedMarker}></Marker>
        <Marker latitude={40.76365178032000} longitude={-111.83804115993648} color="blue" onClick={handleSelectedMarker}></Marker>
        <Marker latitude={40.76488514780368} longitude={-111.84754245587715} color="red" onClick={handleSelectedMarker}></Marker>
        <Marker latitude={40.76000020800805} longitude={-111.84890587460902} color="red" onClick={handleSelectedMarker}></Marker>
        <Marker latitude={40.762493484274415} longitude={-111.84622608779878} color="blue" onClick={handleSelectedMarker}></Marker>

        {/* User */}
        <Marker {...markerLoc} draggable={true} color="red" onDragEnd={handleDrag}>
          You
        </Marker>
      </ReactMapGL>
    </div>
  );
}
