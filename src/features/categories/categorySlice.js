import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
    categories: [],
};

export const getAllCategories = createAsyncThunk("categories/getAllCategories", async () => {
  try {
    return await categoryService.getAllCategories();
  } catch (error) {
    console.error(error);
  }
});

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      });
    },
  });
  export default categorySlice.reducer;