import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth-slice";
import { categoriesReducer } from "./slices/categories-slice";
import { tasksReducer } from "./slices/tasks-slice";

let reduxStore = configureStore({
  reducer: {
    authReducer: authReducer,
    taskReducer: tasksReducer,
    categoryReducer: categoriesReducer,
  },
});

export default reduxStore;
