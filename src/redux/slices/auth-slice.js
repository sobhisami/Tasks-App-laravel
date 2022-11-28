import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

let initialState = {
  loggedIn: JSON.parse(localStorage.getItem("logged_in")) ?? false,
  user: {},
};

let authSlice = createSlice({
  name: "auth-slice",
  initialState: initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setUserInfo(state, action) {
      console.log("setUserInfo");
      console.log(action.payload);
      state.user = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
