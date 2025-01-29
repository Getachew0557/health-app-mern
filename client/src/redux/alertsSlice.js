import { createSlice } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: true,
  },
  reducers: {
    showloading: (state) => {
      state.loading = true;
    },
    hidseloading: (state) => {
      state.loading = false;
    },
  },
});

export const { showloading, hidseloading } = alertsSlice.actions;
