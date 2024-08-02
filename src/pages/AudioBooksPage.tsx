import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import getAudioBooks from "../Services/AudioBooks";
import { Category } from "../types/Category";
import { AudioBook } from "../types/AudioBook";
import ListGroup from "../component/listGroup";
import getCategories from "../Services/Categories";

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
      <div className="row p-0">
        <div className="col mt-5 ">
          <ListGroup categories={categories} />
        </div>
        <div className="col-10">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Type</th>
                <th scope="col">Category Name</th>
                <th scope="col">Run Time(min)</th>
                <th scope="col">is Borrowable</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
