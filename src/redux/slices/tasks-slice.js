import { createSlice } from "@reduxjs/toolkit";

let initialState = { tasks: [], filteredTasks: [] };

let tasksSlice = createSlice({
  name: "tasks-slice",
  initialState: initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    },
    addNewTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
      state.filteredTasks = state.tasks;
    },
    updateTaskStatus(state, action) {},
    filterTasksByStatus(state, action) {
      if (action.payload == "All") {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.tasks.filter(
          (element) => element.status == action.payload
        );
      }
    },
    filterTasksByCategory(state, action) {
      if (action.payload == "All") {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.tasks.filter(
          (element) => element.categoryId == action.payload
        );
      }
    },
    filterTasksByName(state, action) {
      if (action.payload == "") {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.tasks.filter((element) =>
          element.name.includes(action.payload)
        );
      }
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
