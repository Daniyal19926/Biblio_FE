import { useEffect, useState } from "react";
import getCategories from "./Services/Categories";
import getBooks from "./Services/Books";
import getReferenceBooks from "./Services/ReferenceBooks";
import getAudioBooks from "./Services/AudioBooks";
import getDvds from "./Services/Dvds";
import { Category } from "./types/Category";
import { Book } from "./types/Book";
import { Dvd } from "./types/Dvd";
import { ReferenceBook } from "./types/ReferenceBook";
import { AudioBook } from "./types/AudioBook";

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [dvds, setDvds] = useState<Dvd[]>([]);
  const [referenceBooks, setReferenceBooks] = useState<ReferenceBook[]>([]);
  const [audioBooks, setAudioBooks] = useState<AudioBook[]>([]);
  useEffect(() => {
    getCategories()
      .then(({ data }) => {
        setCategories(data);
        return Promise.all([
          getBooks(),
          getDvds(),
          getReferenceBooks(),
          getAudioBooks(),
        ]);
      })
      .then(([booksRes, dvdsRes, referenceBooksRes, audioBooksRes]) => {
        setBooks(booksRes.data);
        setDvds(dvdsRes.data);
        setReferenceBooks(referenceBooksRes.data);
        setAudioBooks(audioBooksRes.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);
  const categoryNames = categories.map((category) => category.book);
  console.log(categoryNames);
  return (
    <div className="container text-center">
      <h1>Library</h1>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            <li className="list-group-item active" aria-current="true">
              An active item
            </li>
            <li className="list-group-item">A second item</li>
            <li className="list-group-item">A third item</li>
            <li className="list-group-item">A fourth item</li>
            <li className="list-group-item">And a fifth one</li>
          </ul>
        </div>
        <div className="col-10">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Type</th>
                <th scope="col">Category Name</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book: Book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.type}</td>
                  <td>{book.category.name}</td>
                </tr>
              ))}
              {referenceBooks.map((referenceBook: ReferenceBook) => (
                <tr key={referenceBook.id}>
                  <td>{referenceBook.title}</td>
                  <td>{referenceBook.type}</td>
                  <td>{referenceBook.category.name}</td>
                </tr>
              ))}
              {audioBooks.map((audioBook: AudioBook) => (
                <tr key={audioBook.id}>
                  <td>{audioBook.title}</td>
                  <td>{audioBook.type}</td>
                  <td>{audioBook.category.name}</td>
                </tr>
              ))}
              {dvds.map((dvd: Dvd) => (
                <tr key={dvd.id}>
                  <td>{dvd.title}</td>
                  <td>{dvd.type}</td>
                  <td>{dvd.category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
