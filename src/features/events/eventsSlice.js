import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventsService from "./eventsService";

const initialState = {
  events: [],
  event: {},
  isLoading: false,
};

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData) => {
    try {
      return await eventsService.createEvent(eventData);
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteEventById = createAsyncThunk(
  "events/deleteEventById",
  async (_id) => {
    try {
      return await eventsService.deleteEventById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async () => {
    try {
      return await eventsService.getAllEvents();
    } catch (error) {
      console.error(error);
    }
  }
);

export const getEventById = createAsyncThunk(
  "events/getEventById",
  async (_id) => {
    try {
      return await eventsService.getEventById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateEventById = createAsyncThunk(
  "events/updateEventById",
  async (_id) => {
    try {
      return await eventsService.updateEventById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.fulfilled, (state, action) => {
        state.event = action.payload;
      })

      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })

      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getEventById.fulfilled, (state, action) => {
        state.event = action.payload;
      })

      .addCase(deleteEventById.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload.event._id
        );
      })

      .addCase(updateEventById.fulfilled, (state, action) => {
        state.event = action.payload.event;
      });
  },
});

export const { reset } = eventsSlice.actions;

export default eventsSlice.reducer;
