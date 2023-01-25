import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import places from "../features/places/placesSlice";
import incidents from "../features/incidents/incidentsSlice";
import events from "../features/events/eventsSlice";
import categories from "../features/categories/categorySlice";
import chatbot from "../features/chatbot/chatbotSlice";

export const store = configureStore({
  reducer: {
    auth,
    incidents,
    events,
    places,
    chatbot,
    categories,
  },
});
