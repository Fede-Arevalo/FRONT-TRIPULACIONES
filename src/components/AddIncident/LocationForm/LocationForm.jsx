import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lmMGRldiIsImEiOiJjbGQwZGdhb3kxNmpnM3J0Z281ZGpwaDNiIn0.4mwFz3BiXuYINpuclHGmIg";

const LocationForm = ({ onLocation }) => {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState("");
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    if (!map) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([-0.3810545927, 39.4822317431]);
      bounds.extend([-0.3772029387, 39.4772260915]);

      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/outdoors-v12",
        zoom: 15,
        logoPosition: "bottom-left",
        attributionControl: false,
        maxBounds: bounds,
      });
      setMap(newMap);

      newMap.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

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
        map?.flyTo({ center: e.result.center });
        setLocation(e.result.place_name);
      });
    }
  }, [geocoder, map]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting location:", location);
    // perform submission action here
  };

  return (
    <div className="location-form">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={"Ubication"}
          />
        </label>
      </form>
      <div id="map"></div>
      <button onClick={() => onLocation(location)}>Close</button>
    </div>
  );
};

export default LocationForm;
