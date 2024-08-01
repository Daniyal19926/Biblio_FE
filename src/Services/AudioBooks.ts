import axios from "axios";

function getAudioBooks() {
  return axios.get("http://localhost:5557/api/audiobooks");
}

export default getAudioBooks;
