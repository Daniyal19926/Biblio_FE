import axios from "axios";

function getReferenceBooks() {
  return axios.get("http://localhost:5557/api/referencebooks");
}

export default getReferenceBooks;
