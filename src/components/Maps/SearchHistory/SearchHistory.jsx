import { useSelector } from "react-redux";

//ESTO ES SOLO PARA PROBAR QUE FUNCIONA RECOGER DATOS DE LA BÚSQUEDA
import React from 'react'


const SearchHistory = () => {
  const places = useSelector((state) => state.places.places);
  return (
    <>
      <div>Searched places</div>
      <div>
        {places.map((place) => (
          <div key={place.id}>{place.place_name}</div>
        ))}
      </div>
    </>
  );
}

export default SearchHistory;
