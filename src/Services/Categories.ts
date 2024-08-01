import axios from "axios";

function getCategories() {
  return axios.get("http://localhost:5557/api/categories/");
}

export default getCategories;
