import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useDispatch } from "react-redux";
import { addPlace } from "../../../features/places/placesService";
import "./MapView.scss"
import 'mapbox-gl/dist/mapbox-gl.css'; 

const MapView = () => {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
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
      bounds.extend([-0.3810545927, 39.4822317431]);
      bounds.extend([-0.3772029387, 39.4772260915]);


      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/outdoors-v12",
        zoom: 15,
        maxBounds: bounds,
        logoPosition: "bottom-left",
        attributionControl: false,
      });

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
        setSearchResult(e.result);
        handleSearch(e.result);
      });
    }
  }, [geocoder, map]);

  useEffect(() => {
    if (geocoder) {
      
    }
  }, [geocoder, map]);

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);
  return <div id="map"></div>;
};

export default MapView;
