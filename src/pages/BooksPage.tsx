import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { Category } from "../types/Category";
import { Book } from "../types/Book";
import ListGroup from "../component/listGroup";
import { getCategories } from "../Services/Categories";
import { deleteBook, getBooks } from "../Services/Books";
import { DEFAULT_CATEGORY } from "../App";
import { Link } from "react-router-dom";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY.id);
  useEffect(() => {
    getBooks().then(({ data }) => setBooks(data));
    getCategories().then(({ data }) =>
      setCategories([DEFAULT_CATEGORY, ...data])
    );
  }, []);
  async function handleDelete(id: string) {
    const originalBooks = books;
    const newBooks = books.filter((book) => book.id !== id);
    setBooks(newBooks);
    try {
      await deleteBook(id);
    } catch (error) {
      setBooks(originalBooks);
    }
  }
  const filteredBooks = selectedCategory
    ? books.filter((book) => book.categoryId === selectedCategory)
    : books;

  return (
    <div className="">
      <Navbar />
      <Link to={"/bookform/new"} className="btn btn-primary mt-2 ms-2">
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
                <th scope="col">Author </th>
                <th scope="col">is Borrowable</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book: Book) => (
                <tr key={book.id}>
                  <td>
                    <Link to={`/bookform/${book.id}`}>{book.title}</Link>
                  </td>
                  <td>{book.type}</td>
                  <td>{book.category.name}</td>

                  <td>{book.author}</td>

                  <td>{book.isBorrowable ? "true" : "false"}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="btn btn-danger"
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
