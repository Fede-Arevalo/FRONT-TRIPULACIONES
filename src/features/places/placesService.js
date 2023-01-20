import { createAsyncThunk } from "@reduxjs/toolkit";

export const addPlace = createAsyncThunk("places/addPlace", async (place) => {
  try {
   
    return place;
  } catch (error) {
    console.error(error);
  }
});

