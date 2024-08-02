import axios from "axios";
const API_URL = "http://localhost:5557/api/dvds";

function getDvds() {
  return axios.get(API_URL);
}
function getDvd(id: string) {
  return axios.get(`${API_URL}/${id}`);
}

function createDvd(body: any) {
  return axios.post(`${API_URL}`, body);
}
function updateDvd(id: string, body: any) {
  return axios.put(`${API_URL}/${id}`, body);
}

function deleteDvd(id: string) {
  return axios.delete(`${API_URL}/${id}`);
}
export { getDvds, getDvd, createDvd, updateDvd, deleteDvd };
