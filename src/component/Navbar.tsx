export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Library
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/bookspage">
                  Books
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dvdspage">
                  Dvds
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/audiobookspage">
                  audioBooks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/referencebookspage">
                  referenceBooks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " aria-disabled="true">
                  Loan out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
