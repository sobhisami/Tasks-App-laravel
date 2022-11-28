import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { TasksContext } from "../cotntext/tasks-context";

const TaskDetails = () => {
  let params = useParams();
  let tasksContext = useContext(TasksContext);
  let [task, setTask] = useState({});

  let fetchTaskDetails = () => {
    let item = tasksContext.tasks.find((element) => element.id == params.id);
    setTask(item);
  };

  let changeTaskStatus = (newStatus) => {
    // let updatedTask = task;
    // updatedTask.status = newStatus;
    // console.log(updatedTask.status);
    // setTask({ ...updatedTask });

    setTask((prevTask) => {
      prevTask.status = newStatus;
      return { ...prevTask };
    });
  };

  useEffect(fetchTaskDetails, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Task - {task.name}</h1>

        <div className="mb-2 mb-md-0">
          <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
          <div className="d-flex align-items-center ms-3 ms-lg-4"></div>
        </div>

        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button
              type="button"
              className={`btn btn-sm btn-outline-secondary ${
                task.status == "In Progress" && "active"
              }`}
              onClick={() => changeTaskStatus("In Progress")}
            >
              In Progress
            </button>
            <button
              type="button"
              className={`btn btn-sm btn-outline-secondary ${
                task.status == "Completed" && "active"
              }`}
              onClick={() => changeTaskStatus("Completed")}
            >
              Completed
            </button>
            <button
              type="button"
              className={`btn btn-sm btn-outline-secondary ${
                task.status == "Waiting" && "active"
              }`}
              onClick={() => changeTaskStatus("Waiting")}
            >
              Waiting
            </button>
            <button
              type="button"
              className={`btn btn-sm btn-outline-secondary ${
                task.status == "Canceled" && "active"
              }`}
              onClick={() => changeTaskStatus("Canceled")}
            >
              Canceled
            </button>
          </div>
          <button type="button" className="btn btn-light-main btn">
            <span data-feather="edit-3"></span> Edit
          </button>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <img src="img/1.png" className="img-fluid rounded de-img" />
        </div>
        <div className="col-md-6 mt-5">
          <div className="mb-3">
            <span data-feather="bookmark" className="main-color"></span>
            <strong>Title:</strong> {task.name}
          </div>
          <div className="mb-3">
            <span data-feather="layers" className="main-color"></span>
            <strong>Category:</strong> {task.category}
          </div>
          <div className="">
            <span data-feather="calendar" className="main-color"></span>
            <strong>Date:</strong> {task.startDate} to {task.endDate}
          </div>
        </div>

        <div className="row mt-5">
          <div className="task-info">
            <p>{task.details}</p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default TaskDetails;
