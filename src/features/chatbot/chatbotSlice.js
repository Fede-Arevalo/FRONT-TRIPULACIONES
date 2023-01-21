import { createSlice } from "@reduxjs/toolkit";
import { askQuestion } from "./chatbotService";

const initialState = {
  question: "",
  response: "",
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(askQuestion.fulfilled, (state, action) => {
      state.question = action.meta.arg.question;
      state.response = action.payload.response;
    });
  },
});

export const { setQuestion, setResponse } = chatbotSlice.actions;

export default chatbotSlice.reducer;
