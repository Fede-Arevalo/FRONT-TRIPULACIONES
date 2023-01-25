import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useDispatch } from "react-redux";
import { addPlace } from "../../../features/places/placesService";
import "./MapView.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lmMGRldiIsImEiOiJjbGQwZGdhb3kxNmpnM3J0Z281ZGpwaDNiIn0.4mwFz3BiXuYINpuclHGmIg";

const MapView = ({ address }) => {
  const [map, setMap] = useState(null);
  const [geocoder] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const dispatch = useDispatch();

  const handleSearch = (searchResult) => {
    console.log("Número: " + searchResult.address);
    console.log("Calle: " + searchResult.place_name);
    console.log(searchResult.center[0]);
    console.log(searchResult.center[1]);
    dispatch(addPlace(searchResult));
  };

  useEffect(() => {
    if (!map) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([-0.42228, 39.480081]);
      bounds.extend([-0.377543, 39.50308]);
      bounds.extend([-0.389433, 39.449085]);
      bounds.extend([-0.42228, 39.480921]);

      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/outdoors-v12",
        zoom: 15,
        logoPosition: "bottom-left",
        center: [-0.398164, 39.482664],
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
          fitBoundsOptions: {
            maxZoom: 15,
          },
        })
      );
    }
  }, [map]);

  useEffect(() => {
    if (address && map) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });
      map.addControl(geocoder);
      geocoder.on("result", (e) => {
        map?.flyTo({ center: e.result.center, zoom: 18 });
        const marker = new mapboxgl.Marker()
          .setLngLat(e.result.center)
          .addTo(map);
        const popup = new mapboxgl.Popup().setHTML(address);
        marker.setPopup(popup);
      });

      geocoder.query(address);
    }
  }, [address, map]);

  useEffect(() => {
    if (geocoder) {
      geocoder.on("result", (e) => {
        map?.flyTo({ center: e.result.center });
        setSearchResult(e.result);
        handleSearch(e.result);
      });
    } // eslint-disable-next-line
  }, [geocoder, map]);  

  useEffect(() => {
    if (searchResult) {
      const marker = new mapboxgl.Marker({
        color: "#00FF00",
        // Rojo: #FF0000,
        // Naranja: #FFA500
        // Amarillo: #FFFF00
        // Verde: #00FF00
        draggable: false,
      })

        .setLngLat(searchResult.center)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(searchResult.place_name)
        )
        .addTo(map);

      marker.getElement().addEventListener("click", () => {});
    }
  }, [searchResult, map]);

  return (
    <>
      <div id="map"></div>
    </>
  );
};

export default MapView;
