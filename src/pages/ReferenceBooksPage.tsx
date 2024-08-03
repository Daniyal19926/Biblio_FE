import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { Category } from "../types/Category";
import ListGroup from "../component/listGroup";
import { getCategories } from "../Services/Categories";
import { ReferenceBook } from "../types/ReferenceBook";
import {
  deleteReferenceBook,
  getReferenceBooks,
} from "../Services/ReferenceBooks";
import { DEFAULT_CATEGORY } from "../App";

export default function ReferenceBooksPage() {
  const [referenceBooks, setReferenceBooks] = useState<ReferenceBook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY.id);
  useEffect(() => {
    getReferenceBooks().then(({ data }) => setReferenceBooks(data));
    getCategories().then(({ data }) =>
      setCategories([DEFAULT_CATEGORY, ...data])
    );
  }, []);
  async function handleDelete(id: string) {
    const originalReferenceBooks = referenceBooks;
    const newReferenceBooks = referenceBooks.filter(
      (referenceBook) => referenceBook.id !== id
    );
    setReferenceBooks(newReferenceBooks);
    try {
      await deleteReferenceBook(id);
    } catch (error) {
      setReferenceBooks(originalReferenceBooks);
    }
  }

  return (
    <div className="">
      <Navbar />
      <button
        onClick={() => console.log("new")}
        className="btn btn-primary mt-2 ms-2"
      >
        Create
      </button>

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
                <th scope="col">Author </th>
                <th scope="col">is Borrowable</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {referenceBooks.map((referenceBook: ReferenceBook) => (
                <tr key={referenceBook.id}>
                  <td>{referenceBook.title}</td>
                  <td>{referenceBook.type}</td>
                  <td>{referenceBook.category.name}</td>

                  <td>{referenceBook.author}</td>

                  <td>{referenceBook.isBorrowable ? "true" : "false"}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(referenceBook.id)}
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
