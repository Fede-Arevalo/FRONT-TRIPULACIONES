import React from 'react'
import MapView from './MapView/MapView'
import mapboxgl from 'mapbox-gl'; 
import SearchHistory from './SearchHistory/SearchHistory';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2lmMGRldiIsImEiOiJjbGQwZGdhb3kxNmpnM3J0Z281ZGpwaDNiIn0.4mwFz3BiXuYINpuclHGmIg';

const Maps = () => {
  return (
    <div>
      <MapView/>
      <SearchHistory/>
      </div>

  )
}

export default Maps