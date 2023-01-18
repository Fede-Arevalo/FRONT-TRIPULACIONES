import React from 'react'
import MapView from './MapView'
import mapboxgl from 'mapbox-gl'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'; 


mapboxgl.accessToken = 'pk.eyJ1Ijoic2lmMGRldiIsImEiOiJjbGQwZGdhb3kxNmpnM3J0Z281ZGpwaDNiIn0.4mwFz3BiXuYINpuclHGmIg';

const Maps = () => {
  return (
    <div><MapView/></div>
  )
}

export default Maps