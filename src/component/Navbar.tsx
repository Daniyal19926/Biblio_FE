import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Library
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link "
                  aria-current="page"
                  to={"/bookspage"}
                >
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/dvdspage"}>
                  Dvds
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/audiobookspage"}>
                  AudioBooks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={"/referencebookspage"}>
                  ReferenceBooks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={"/"}>
                  Loan out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
