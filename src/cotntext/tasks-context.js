import React, { useState } from "react";
import TasksApiController from "../controller/tasks-api-controller";

export const TasksContext = React.createContext({
  tasks: [],
  setTasks: (tasks) => {},
  apiController: null,
});

export const TasksContextProvider = (props) => {
  let [tasks, setTasks] = useState([]);
  return (
    <TasksContext.Provider
      value={{
        tasks: tasks,
        setTasks: setTasks,
        apiController: new TasksApiController(),
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};
