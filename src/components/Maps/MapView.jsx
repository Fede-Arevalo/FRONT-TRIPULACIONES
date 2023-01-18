import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";


const MapView = () => {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);



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

      const newGeocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });
      newMap.addControl(newGeocoder);
      setGeocoder(newGeocoder);
    }
  }, [map]);

  useEffect(() => {
    if (geocoder) {
      geocoder.on("result", (e) => {
        map.flyTo({ center: e.result.center });
      });
    }
  }, [geocoder, map]);

  return <div id="map" style={{ height: "75vh", width: "100vw" }}></div>;
};

export default MapView;
