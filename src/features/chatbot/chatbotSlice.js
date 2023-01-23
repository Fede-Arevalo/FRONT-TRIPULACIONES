import { createSlice } from "@reduxjs/toolkit";
import { askQuestion } from "./chatbotService";

const initialState = {
  question: "",
  response: "",
  status: "idle",
  error: null
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(askQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(askQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload.response;
      })
      .addCase(askQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { setQuestion } = chatbotSlice.actions;

export default chatbotSlice.reducer;
