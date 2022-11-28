import axios from "axios";
import ApiResponse from "../models/ApiResponse";

class AuthApiController {
  performLogin = async (email, password) => {
    axios.defaults.baseURL = "http://tasks-api.mr-dev.tech";
    axios.defaults.withCredentials = true;
    try {
      let response = await axios.get("/sanctum/csrf-cookie");
      if (response.status == 204) {
        return await this.login(email, password);
      }
    } catch (error) {
      return new ApiResponse(error.response.data.error.message, false);
    }
  };

  login = async (email, password) => {
    try {
      axios.defaults.baseURL = "http://tasks-api.mr-dev.tech/api";
      axios.defaults.withCredentials = true;
      let response = await axios.post(
        `/api/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return new ApiResponse("Logged in successfully", true);
    } catch (error) {
      console.log(error.response);
      return new ApiResponse(error.response.data.message, false);
    }
  };

  userInfo = async () => {
    axios.defaults.baseURL = "http://tasks-api.mr-dev.tech/api";
    axios.defaults.withCredentials = true;
    try {
      let response = await axios.get("/api/user");
      if (response.status == 200) {
        let apiResponse = new ApiResponse("Success", true);
        apiResponse.user = response.data;
        return apiResponse;
      }
    } catch (error) {
      return new ApiResponse(error.response.data.message, false);
    }
  };

  logout = async () => {
    axios.defaults.baseURL = "http://tasks-api.mr-dev.tech/api";
    axios.defaults.withCredentials = true;
    try {
      let response = await axios.get("/api/auth/logout");
      if (response.status == 204) {
        return new ApiResponse("Logged out successfully", true);
      }
    } catch (error) {
      if (error.response.status == 401) {
        return new ApiResponse("Logged out successfully", true);
      }
      return new ApiResponse(error.response.data.message, false);
    }
  };

  performRegister = async (name, userName, email, password) => {
    axios.defaults.baseURL = "http://tasks-api.mr-dev.tech";
    axios.defaults.withCredentials = true;
    try {
      let response = await axios.get("/sanctum/csrf-cookie");
      if (response.status == 204) {
        return await this.register(name, userName, email, password);
      }
    } catch (error) {
      return new ApiResponse(error.response.data.error.message, false);
    }
  };

  register = async (name, userName, email, password) => {
    // axios.defaults.withCredentials = true;
    // axios.defaults.baseURL = "http://127.0.0.1:8000/api";

    try {
      let response = await axios.post(
        `/api/auth/register`,
        {
          name: name,
          email: email,
          user_name: userName,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let apiResponse = new ApiResponse("Registered successfully", true);
      return apiResponse;
    } catch (error) {
      return new ApiResponse(error.response.data.error.message, false);
    }
  };
}
export default AuthApiController;
