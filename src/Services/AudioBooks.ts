import axios from "axios";
const API_URL = "http://https://biblio-be-2.onrender.com/api/audiobooks";

function getAudioBooks() {
  return axios.get(API_URL);
}

function getAudioBook(id: string) {
  return axios.get(`${API_URL}/${id}`);
}
function createAudioBook(body: any) {
  return axios.post(API_URL, body);
}
function updateAudioBook(id: string, body: any) {
  return axios.put(`${API_URL}/${id}`, body);
}

function deleteAudioBook(id: string) {
  return axios.delete(`${API_URL}/${id}`);
}
export {
  getAudioBook,
  getAudioBooks,
  createAudioBook,
  updateAudioBook,
  deleteAudioBook,
};
