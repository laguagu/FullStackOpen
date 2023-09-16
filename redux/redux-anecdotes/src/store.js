import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationSlice";
import anecdoteReducer from "./reducers/anecdoteReducer";




const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});



export default store