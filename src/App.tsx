import { useEffect, useState } from "react";
import { getCategories } from "./Services/Categories";
import { getBooks } from "./Services/Books";
import { getReferenceBooks } from "./Services/ReferenceBooks";
import { getAudioBooks } from "./Services/AudioBooks";
import { getDvds } from "./Services/Dvds";
import { Category } from "./types/Category";
import { Book } from "./types/Book";
import { Dvd } from "./types/Dvd";
import { ReferenceBook } from "./types/ReferenceBook";
import { AudioBook } from "./types/AudioBook";
import Navbar from "./component/Navbar";
import { Link } from "react-router-dom";
import SimpleListGroup from "./component/SimpleListGroup";
export const DEFAULT_CATEGORY: Category = {
  id: "",
  name: "All Categories",
};
export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [dvds, setDvds] = useState<Dvd[]>([]);
  const [referenceBooks, setReferenceBooks] = useState<ReferenceBook[]>([]);
  const [audioBooks, setAudioBooks] = useState<AudioBook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data));

    getBooks().then(({ data }) => setBooks(data));
    getReferenceBooks().then(({ data }) => setReferenceBooks(data));
    getAudioBooks().then(({ data }) => setAudioBooks(data));
    getDvds().then(({ data }) => setDvds(data));

    setLoading(false);
  }, []);
  useEffect(() => {
    if (!loading) {
      setLibraryItems([...books, ...audioBooks, ...dvds, ...referenceBooks]);
    }
  }, [books, audioBooks, dvds, referenceBooks, loading]);

  return (
    <div>
      <div className=" p-4">
        <Navbar />
        <Link
          to={"/categoryformpage/new"}
          className="btn btn-primary mt-2 ms-2"
        >
          Create Category
        </Link>

        <div className="row p-0 container text-centre">
          <div className="col mt-5">
            <SimpleListGroup categories={categories} />
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
                {libraryItems.map((libraryItem: any) => (
                  <tr key={libraryItem.id}>
                    <td>{libraryItem.title}</td>
                    <td>{libraryItem.type}</td>
                    <td>{libraryItem.category.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
