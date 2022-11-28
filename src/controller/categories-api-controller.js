import axios from "axios";
import ApiResponse from "../models/ApiResponse";

class CategoriesApiController {
  /**
   * Operations:
   * 1) Read
   */

  fetchCategories = async () => {
    axios.defaults.baseURL = "http://tasks-api.mr-dev.tech/api";
    axios.defaults.withCredentials = true;
    let response = await axios.get("/categories");
    if (response.status == 200) {
      let categories = [];
      for (let item in response.data.data) {
        categories.push(response.data.data[item]);
      }
      //   let apiResponse = new ApiResponse("Success", true);
      //   apiResponse.categories = categories;
      //   return apiResponse;
      return categories;
    }
    return [];
  };
}
export default CategoriesApiController;
