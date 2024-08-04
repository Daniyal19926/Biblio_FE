import axios from "axios";
const API_URL = "https://biblio-be-2.onrender.com/api/referencebooks";

function getReferenceBooks() {
  return axios.get(API_URL);
}

function getReferenceBook(id: string) {
  return axios.get(`${API_URL}/${id}`);
}
function createReferenceBook(body: any) {
  return axios.post(API_URL, body);
}
function updateReferenceBook(id: string, body: any) {
  return axios.put(`${API_URL}/${id}`, body);
}
function deleteReferenceBook(id: string) {
  return axios.delete(`${API_URL}/${id}`);
}
export {
  getReferenceBooks,
  getReferenceBook,
  createReferenceBook,
  updateReferenceBook,
  deleteReferenceBook,
};
