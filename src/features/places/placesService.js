import { createAsyncThunk } from "@reduxjs/toolkit";

export const addPlace = createAsyncThunk("places/addPlace", async (place) => {
  try {
    // aquí podrías hacer una petición a una API o almacenar el lugar en algún lugar
    // pero como es solo un ejemplo, solo se retorna el lugar
    return place;
  } catch (error) {
    console.error(error);
  }
});

