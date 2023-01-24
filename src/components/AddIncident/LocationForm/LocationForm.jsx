import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./LocationForm.scss";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lmMGRldiIsImEiOiJjbGQwZGdhb3kxNmpnM3J0Z281ZGpwaDNiIn0.4mwFz3BiXuYINpuclHGmIg";

const LocationForm = ({ onLocation, closeModal }) => {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState("");
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    if (!map) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([-0.3810545927, 39.4822317431]);
      bounds.extend([-0.3772029387, 39.4772260915]);

      const newMap = new mapboxgl.Map({
        container: "map-2",
        style: "mapbox://styles/mapbox/outdoors-v12",
        zoom: 15,
        center: [-0.3810545927, 39.4822317431],
        logoPosition: "bottom-left",
        attributionControl: false,
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
  };

  return (
    <div className="location-form">
      <form onSubmit={handleSubmit}></form>
      <div id="map-2"></div>
      <div className="button-container">
        <button
          className="button-map"
          onClick={() => {
            onLocation(location);
          }}>
          Esta es la dirección
        </button>
        <button
          className="button-map-close"
          onClick={() => {
            closeModal();
          }}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default LocationForm;
