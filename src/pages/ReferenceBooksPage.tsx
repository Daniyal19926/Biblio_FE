import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { Category } from "../types/Category";
import ListGroup from "../component/listGroup";
import { getCategories } from "../Services/Categories";
import { ReferenceBook } from "../types/ReferenceBook";
import { getReferenceBooks } from "../Services/ReferenceBooks";

export default function ReferenceBooksPage() {
  const [referenceBooks, setReferenceBooks] = useState<ReferenceBook[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, SetLoading] = useState(true);
  useEffect(() => {
    getReferenceBooks().then(({ data }) => setReferenceBooks(data));
    getCategories().then(({ data }) => setCategories(data));
    SetLoading(false);
  }, []);
  if (loading) {
    <div>the page is Loading</div>;
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
          <ListGroup categories={categories} />
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
                      onClick={() => console.log(referenceBook.id)}
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
