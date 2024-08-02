import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { Category } from "../types/Category";
import ListGroup from "../component/listGroup";
import { getCategories } from "../Services/Categories";
import { Dvd } from "../types/Dvd";
import { deleteDvd, getDvds } from "../Services/Dvds";

export default function DvdsPage() {
  const [dvds, setDvds] = useState<Dvd[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getDvds().then(({ data }) => setDvds(data));
    getCategories().then(({ data }) => setCategories(data));
  }, []);
  async function handleDelete(id: string) {
    const originalDvds = dvds;
    const newDvds = dvds.filter((dvd) => dvd.id !== id);
    setDvds(newDvds);
    try {
      await deleteDvd(id);
    } catch (error) {
      setDvds(originalDvds);
    }
  }

  return (
    <div>
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
              {dvds.map((dvd: Dvd) => (
                <tr key={dvd.id}>
                  <td>{dvd.title}</td>
                  <td>{dvd.type}</td>
                  <td>{dvd.category.name}</td>

                  <td>{dvd.runTimeMinutes}</td>

                  <td>{dvd.isBorrowable ? "true" : "false"}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(dvd.id)}
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
