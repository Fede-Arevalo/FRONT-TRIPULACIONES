import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const askQuestion = createAsyncThunk("chatbot/askQuestion", async (question, thunkAPI) => {
    try {
        const data = { question };
        const res = await axios.post('https://chatbotapi-production-dbc1.up.railway.app/chat/', data);
        return res.data;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error.message);
    }
});
