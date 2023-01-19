const addPlace = (place) => {
    return (dispatch) => {
        dispatch(addPlace(place));
    }
}

const placesService = {
    addPlace,
}

export default placesService;
