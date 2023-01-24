import React from 'react'
import MapView from './MapView/MapView'
import mapboxgl from 'mapbox-gl'; 
import SearchHistory from './SearchHistory/SearchHistory';


const Maps = () => {
  return (
    <div>
      <MapView/>
      <SearchHistory/>
      </div>

  )
}

export default Maps