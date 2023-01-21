import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import posts from "../features/posts/postsSlice";
<<<<<<< HEAD
import comments from "../features/comments/commentsSlice";
import places from "../features/places/placesSlice"
export const store = configureStore({
  reducer: {
    auth,
    posts,
    comments,
    places,
=======
import incidents from "../features/incidents/incidentsSlice";

export const store = configureStore({
  reducer: {
    auth,
    posts, 
    incidents,   
>>>>>>> develop
  },
});
