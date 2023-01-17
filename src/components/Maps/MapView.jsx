import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const MapView = () => {
    const [map, setMap] = useState(null);
  
    useEffect(() => {
      if (!map) {
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([-0.432054, 39.495578]);
        bounds.extend([-0.379526, 39.475606]);
        const newMap = new mapboxgl.Map({
          container: 'map', 
          style: 'mapbox://styles/mapbox/streets-v12', 
          zoom: 15, 
          maxBounds: bounds 
        });
        setMap(newMap);
      }
    }, [map]);
    
    return <div id="map" style={{height: "85vh", width: "100vw"}} ></div>;
  };


  

export default MapView;

