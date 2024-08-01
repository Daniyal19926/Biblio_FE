import { useEffect, useState } from "react";
import getCategories from "./Services/Categories";
import getBooks from "./Services/Books";
import getReferenceBooks from "./Services/ReferenceBooks";
import getAudioBooks from "./Services/AudioBooks";
import getDvds from "./Services/Dvds";

export default function App() {
  interface Category {
    id: string;
    name: string;
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [books, SetBooks] = useState([]);
  const [referenceBooks, SetReferenceBooks] = useState([]);
  const [dvds, SetDvds] = useState([]);
  const [audioBooks, SetAudioBooks] = useState([]);

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data);
      getBooks().then(({ data }) => SetBooks(data));
      getReferenceBooks().then(({ data }) => SetReferenceBooks(data));
      getAudioBooks().then(({ data }) => SetAudioBooks(data));
      getDvds().then(({ data }) => SetDvds(data));
    });
  }, []);
  console.log("categories", categories);
  console.log("books", books);
  console.log("referenceBooks", referenceBooks);
  console.log("audioBooks", audioBooks);
  console.log("dvds", dvds);

  return (
    <div className="container text-center">
      <h1>Library</h1>
      <div className="row">
        <div className="col-2 p-0">
          <ul className="list-group ">
            <li className="list-group-item">Categories</li>
            {categories.map((category) => (
              <li className="list-group-item" key={category.id}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-10">
          <table className="table table-light">
            <thead>
              <tr className="table-primary"></tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
