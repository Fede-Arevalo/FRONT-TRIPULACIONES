import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const MapView = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([-0.401738, 39.483339]);
      bounds.extend([-0.392812, 39.481269]);
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        zoom: 10,
        maxBounds: bounds,
      });
      newMap.setCenter([-0.398195, 39.482678]);
      setMap(newMap);
    }
  }, [map]);

  return <div id="map" style={{ height: "85vh", width: "50vw" }}></div>;
};

export default MapView;
