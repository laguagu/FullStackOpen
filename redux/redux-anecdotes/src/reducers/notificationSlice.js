import { createSlice } from "@reduxjs/toolkit";

const initialState = null; // Alusta notifikaatio null-arvolla

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      // Aseta notifikaatio action.payload:iin
      return action.payload;
    },
    clearNotification: (state) => {
      // Tyhjennä notifikaatio (asetetaan null)
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
