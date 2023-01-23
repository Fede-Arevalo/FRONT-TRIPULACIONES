import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
  genres: [],
};

export const getAllCategories = createAsyncThunk("categories/getAllGenres", async () => {
  try {
    return await categoryService.getAllGenres();
  } catch (error) {
    console.error(error);
  }
});

export const genresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllGenres.fulfilled, (state, action) => {
        state.genres = action.payload.genres;
      });
    },
  });
  
  export default genresSlice.reducer;