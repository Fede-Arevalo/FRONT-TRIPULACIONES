import { createSlice } from "@reduxjs/toolkit";

export const placesSlice = createSlice({
  name: "places",
  initialState: [],
  reducers: {
    setPlaces: (state, action) => {
      state = action.payload;
    },
    addPlace: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { setPlaces, addPlace } = placesSlice.actions;

export default placesSlice.reducer;
