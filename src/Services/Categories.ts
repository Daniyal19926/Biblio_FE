import axios from "axios";
const API_URL = "http://https://biblio-be-2.onrender.com/api/categories";
function getCategories() {
  return axios.get(API_URL);
}
function getCategory(id: string) {
  return axios.get(`${API_URL}/${id}`);
}

function createCategory(body: any) {
  return axios.post(`${API_URL}`, body);
}

function updateCategory(id: string, body: any) {
  return axios.put(`${API_URL}/${id}`, body);
}

function deleteCategory(id: string) {
  return axios.delete(`${API_URL}/${id}`);
}
export {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
