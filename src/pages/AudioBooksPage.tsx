import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { getAudioBooks } from "../Services/AudioBooks";
import { Category } from "../types/Category";
import { AudioBook } from "../types/AudioBook";
import ListGroup from "../component/listGroup";
import { getCategories } from "../Services/Categories";
export default function AudioBooksPage() {
  const [audioBooks, setAudioBooks] = useState<AudioBook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, SetLoading] = useState(true);
  useEffect(() => {
    getAudioBooks().then(({ data }) => setAudioBooks(data));
    getCategories().then(({ data }) => setCategories(data));
    SetLoading(false);
  }, []);
  if (loading) {
    <div>the page is Loading</div>;
  }
  return (
    <div className="">
      <Navbar />
      <button className="btn btn-primary mt-2 ms-2">Create</button>

      <div className="row p-0 container text-centre ">
        <div className="col mt-5 ms-2 ">
          <ListGroup categories={categories} />
        </div>
        <div className="col-10">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Type</th>
                <th scope="col">Category Name</th>
                <th scope="col">Run Time(min)</th>
                <th scope="col">is Borrowable</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {audioBooks.map((audioBook: AudioBook) => (
                <tr key={audioBook.id}>
                  <td>{audioBook.title}</td>
                  <td>{audioBook.type}</td>
                  <td>{audioBook.category.name}</td>

                  <td>{audioBook.runTimeMinutes}</td>

                  <td>{audioBook.isBorrowable ? "true" : "false"}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => console.log(audioBook.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
