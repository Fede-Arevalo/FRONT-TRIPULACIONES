import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapView = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [-74.5, 40], 
      zoom: 9, 
    });
  }, []);

  return <div id="map"></div>;
};

export default MapView;
