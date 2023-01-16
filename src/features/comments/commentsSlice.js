import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comments: [],
};

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (myObj) => {
    try {
      return await commentsService.createComment(myObj);
    } catch (error) {
      console.error(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default commentsSlice.reducer;
