import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import TasksApiController from "../controller/tasks-api-controller";
import { tasksActions } from "../redux/slices/tasks-slice";
import { authActions } from "../redux/slices/auth-slice";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  let tasks = useSelector((state) => state.taskReducer.filteredTasks);
  let categories = useSelector((state) => state.categoryReducer.categories);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let tasksApiController = new TasksApiController();

  let onStatusFilterChangeHandler = (event) => {
    if (event.target.value != "All") {
      dispatch(tasksActions.filterTasksByStatus(event.target.value));
    } else {
      dispatch(tasksActions.filterTasksByStatus("All"));
    }
  };

  let onCategoryFilterChangeHandler = (event) => {
    if (event.target.value != "All") {
      dispatch(tasksActions.filterTasksByCategory(event.target.value));
    } else {
      dispatch(tasksActions.filterTasksByCategory("All"));
    }
  };

  let fetchTasks = async () => {
    if (tasks.length == 0) {
      let response = await tasksApiController.fetchTasks();
      console.log(response);
      console.log(response.status);

      if (response.status == 200) {
        if (response.tasks.length != 0) {
          dispatch(tasksActions.setTasks(response.tasks));
        }
      } else if (response.status == 401) {
        dispatch(authActions.setLoggedIn(false));
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>

        <div className="mb-2 mb-md-0">
          <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
          <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
        </div>

        <ul className="list-inline">
          <li className="list-inline-item">
            <select
              className="dropdown form-control pull-right"
              placeholder="Filter By status"
              autoComplete="off"
              onChange={onStatusFilterChangeHandler}
            >
              <option value="All">All</option>
              <option value="Waiting">Waiting</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </li>
          <li className="list-inline-item mt-3">
            <select
              className="dropdown form-control pull-right"
              placeholder="Filter By status"
              autoComplete="off"
              onChange={onCategoryFilterChangeHandler}
            >
              <option value="All">All Categories</option>
              {categories.map((element) => (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>

      <div className="row mt-5">
        {tasks.map((element) => (
          <Task key={element.id} task={element} />
        ))}
      </div>
    </main>
  );
};
export default Tasks;
