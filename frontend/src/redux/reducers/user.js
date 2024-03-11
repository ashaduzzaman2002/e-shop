import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("GET_USER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("GET_USER_SUCCESS", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("GET_USER_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("CLEAR_ERROR", (state) => {
      state.error = null;
    });
});
