import { createSlice } from "@reduxjs/toolkit";
import { addPlace } from "./placesService";

const initialState = {
  places: [],
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPlace.fulfilled, (state, action) => {
        state.places.push(action.payload);
      });
  },
});

export const { setPlaces } = placesSlice.actions;

export default placesSlice.reducer;
