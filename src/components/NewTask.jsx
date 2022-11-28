import { useContext } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import TasksApiController from "../controller/tasks-api-controller";
import { TasksContext } from "../cotntext/tasks-context";
import Task from "../models/Task";
import { tasksActions } from "../redux/slices/tasks-slice";

const NewTask = () => {
  let nameRef = useRef();
  let categoryRef = useRef();
  let briefDetailsRef = useRef();
  let detailsRef = useRef();
  let startDateRef = useRef();
  let endDateRef = useRef();
  let imageRef = useRef();

  // let tasksContext = useContext(TasksContext);
  let tasksApiController = new TasksApiController();

  let categories = useSelector((state) => state.categoryReducer.categories);
  let dispatch = useDispatch();

  let saveTaskSubmitHandler = (event) => {
    event.preventDefault();
    if (checkData()) {
      createTask();
    }
  };

  let createTask = async () => {
    const task = newTask();
    let response = await tasksApiController.createTask(task);
    if (response.status) {
      // tasksContext.setTasks((prevTasks) => {
      //   return [task, ...prevTasks];
      // });
      dispatch(tasksActions.addNewTask(response.task));
      clear();
    }
    alert(response.task.name);
  };

  let clear = () => {
    nameRef.current.value = "";
    detailsRef.current.value = "";
    categoryRef.current.value = "";
    startDateRef.current.value = "";
    endDateRef.current.value = "";
  };

  let checkData = () => {
    if (
      nameRef.current.value != "" &&
      categoryRef.current.value != "" &&
      detailsRef.current.value != "" &&
      startDateRef.current.value != "" &&
      endDateRef.current.value != ""
    ) {
      return true;
    }
    return false;
  };

  let newTask = () => {
    let task = new Task();
    task.name = nameRef.current.value;
    task.categoryId = categoryRef.current.value;
    task.briefDetails = briefDetailsRef.current.value;
    task.details = detailsRef.current.value;
    task.startDate = startDateRef.current.value;
    task.endDate = endDateRef.current.value;
    task.imageUrl = imageRef.current.files[0];
    return task;
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 mt-3">Add New Task</h1>
      </div>

      <form className="row mt-5" onSubmit={saveTaskSubmitHandler}>
        <div className="col-md-12">
          <div className="form-outline mb-4">
            <label className="form-label">Task name</label>
            <input
              type="texy"
              id="loginName"
              className="form-control"
              placeholder="Task name"
              ref={nameRef}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-outline mb-4">
            <label className="form-label">Task Category</label>
            <select
              className="dropdown form-control pull-right"
              placeholder="Filter By status"
              autoComplete="off"
              ref={categoryRef}
            >
              <option value="">Filter By category</option>
              {categories.map((element) => (
                <option value={element.id}>{element.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-outline mb-4">
            <label className="form-label">Image For Task</label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              ref={imageRef}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-outline mb-4">
            <label className="form-label">Task Brief Details</label>
            <input
              type="texy"
              id="briefDetails"
              className="form-control"
              placeholder="Task brief details"
              ref={briefDetailsRef}
            />
          </div>
        </div>

        <div className="col-md-12">
          <label className="form-label">Task Details</label>
          <div className="form-outline mb-4">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              ref={detailsRef}
            ></textarea>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-outline mb-4">
            <label className="form-label">Start date</label>
            <input
              type="date"
              className="form-control"
              ref={startDateRef}
              placeholder="Task name"
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">End date</label>
          <div className="form-outline mb-4">
            <input
              type="date"
              className="form-control"
              ref={endDateRef}
              placeholder="Task name"
            />
          </div>
        </div>

        <div>
          <button type="submit" className="pull-right btn btn-main mb-4">
            Add New Task
          </button>
        </div>
      </form>
    </main>
  );
};
export default NewTask;
