import axios from "axios";
const API_URL = "https://biblio-be-2.onrender.com/api/books";

function getBooks() {
  return axios.get(API_URL);
}

function getBook(id: string) {
  return axios.get(`${API_URL}/${id}`);
}

function createBook(body: any) {
  return axios.post(`${API_URL}`, body);
}
function updateBook(id: string, body: any) {
  return axios.put(`${API_URL}/${id}`, body);
}
function deleteBook(id: string) {
  return axios.delete(`${API_URL}/${id}`);
}
export { getBook, getBooks, createBook, updateBook, deleteBook };
