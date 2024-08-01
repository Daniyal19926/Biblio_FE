import axios from "axios";

function getBooks() {
  return axios.get("http://localhost:5557/api/books");
}

export default getBooks;
