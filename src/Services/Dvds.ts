import axios from "axios";

function getDvds() {
  return axios.get("http://localhost:5557/api/dvds");
}

export default getDvds;
