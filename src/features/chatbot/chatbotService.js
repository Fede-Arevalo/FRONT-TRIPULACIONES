import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const askQuestion = createAsyncThunk("chatbot/askQuestion", async (question, thunkAPI) => {
    try {
        const data = { question };
        const headers = {
            'origin': 'http://localhost:3000',
            'x-requested-with': 'XMLHttpRequest'
        };
        const res = await axios.post('https://cors-anywhere.herokuapp.com/https://chatbotapi-production-dbc1.up.railway.app/chat/', data, { headers });
        return res.data;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error);
    }
});
