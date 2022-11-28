import axios from "axios";
import ApiResponse from "../models/ApiResponse";
import Task from "../models/Task";

class TasksApiController {
  /**
   * Operations:
   * 1) Create
   * 2) Read
   * 3) Delete
   * 4) Update
   */

  /**
   * Create function
   * @param Task task
   * @return bool
   */

  constructor() {}

  createTask = async (task) => {
    axios.defaults.baseURL = "http://tasks-api.mr-dev.tech/api";
    axios.defaults.withCredentials = true;

    let formData = new FormData();
    formData.append("name", task.name);
    formData.append("image", task.imageUrl);
    formData.append("brief_details", task.briefDetails);
    formData.append("details", task.details);
    formData.append("from_date", task.startDate);
    formData.append("to_date", task.endDate);
    formData.append("category_id", task.categoryId);

    try {
      let response = await axios.post(`/tasks`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let item = response.data.object;
      let task = new Task().fromJSON(item);
      // let task = this.fromJSON(item);
      let apiResponse = new ApiResponse("Task created successfully", true);
      apiResponse.task = task;
      return apiResponse;
    } catch (error) {
      console.log(error);
      return new ApiResponse("Failed to create task", false);
    }
  };

  fetchTasks = async () => {
    axios.defaults.baseURL = "http://tasks-api.mr-dev.tech/api";
    axios.defaults.withCredentials = true;
    try {
      let response = await axios.get(`/tasks`);
      console.log(response);
      let tasks = [];
      for (let obj in response.data.data) {
        let item = response.data.data[obj];
        let task = new Task().fromJSON(item);
        // let task = this.fromJSON(item);
        tasks.push(task);
      }
      console.log(tasks);
      return { status: 200, tasks: tasks };
    } catch (error) {
      console.log(error);
      return { status: error.response.status, tasks: [] };
    }
  };

  fromJSON = (jsonObject) => {
    let task = new Task();
    task.id = jsonObject.id;
    task.name = jsonObject.name;
    task.categoryId = jsonObject.category_id;
    task.details = jsonObject.details;
    task.briefDetails = jsonObject.brief_details;
    task.startDate = jsonObject.from_date;
    task.endDate = jsonObject.to_date;
    task.status = jsonObject.status;
    task.imageUrl = jsonObject.image_url;
    return task;
  };
}

export default TasksApiController;
