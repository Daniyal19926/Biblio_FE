import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { deleteAudioBook, getAudioBooks } from "../Services/AudioBooks";
import { Category } from "../types/Category";
import { AudioBook } from "../types/AudioBook";
import ListGroup from "../component/listGroup";
import { getCategories } from "../Services/Categories";
import { DEFAULT_CATEGORY } from "../App";
import { Link } from "react-router-dom";

export default function AudioBooksPage() {
  const [audioBooks, setAudioBooks] = useState<AudioBook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY.id);

  useEffect(() => {
    getAudioBooks().then(({ data }) => setAudioBooks(data));
    getCategories().then(({ data }) =>
      setCategories([DEFAULT_CATEGORY, ...data])
    );
  }, []);
  async function handleDelete(id: string) {
    const originalAudioBooks = audioBooks;
    const newAudioBooks = audioBooks.filter((book) => book.id !== id);
    setAudioBooks(newAudioBooks);
    try {
      await deleteAudioBook(id);
    } catch (error) {
      setAudioBooks(originalAudioBooks);
    }
  }
  const filteredAudioBooks = selectedCategory
    ? audioBooks.filter(
        (audioBook) => audioBook.categoryId === selectedCategory
      )
    : audioBooks;
  return (
    <div className="">
      <Navbar />
      <Link to={"/audiobookform/new"} className="btn btn-primary mt-2 ms-2">
        Create
      </Link>

      <div className="row p-0 container text-centre ">
        <div className="col mt-5 ms-2 ">
          <ListGroup
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
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
              {filteredAudioBooks.map((audioBook: AudioBook) => (
                <tr key={audioBook.id}>
                  <td>
                    <Link to={`/audiobookform/${audioBook.id}`}>
                      {audioBook.title}
                    </Link>
                  </td>
                  <td>{audioBook.type}</td>
                  <td>{audioBook.category.name}</td>

                  <td>{audioBook.runTimeMinutes}</td>

                  <td>{audioBook.isBorrowable ? "true" : "false"}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(audioBook.id)}
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
