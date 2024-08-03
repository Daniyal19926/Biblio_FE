import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BooksPage from "./pages/BooksPage.tsx";
import AudioBooksPage from "./pages/AudioBooksPage.tsx";
import ReferenceBooksPage from "./pages/ReferenceBooksPage.tsx";
import DvdsPage from "./pages/DvdsPage.tsx";
import CategoriesFormPage from "./pages/CategoryFormPage.tsx";
import BookForm from "./pages/Forms/BookForm.tsx";
import ReferenceBookForm from "./pages/Forms/ReferenceBookForm.tsx";
import AudioBookForm from "./pages/Forms/AudioBookForm.tsx";
import DvdForm from "./pages/Forms/DvdForm.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/bookspage",
    element: <BooksPage />,
  },
  {
    path: "/audiobookspage",
    element: <AudioBooksPage />,
  },
  {
    path: "/referencebookspage",
    element: <ReferenceBooksPage />,
  },
  {
    path: "/dvdspage",
    element: <DvdsPage />,
  },
  {
    path: "/categoryformpage",
    element: <CategoriesFormPage />,
  },
  {
    path: "/categoryformpage/:id",
    element: <CategoriesFormPage />,
  },
  {
    path: "/bookform/:id",
    element: <BookForm />,
  },
  {
    path: "/referencebookform/:id",
    element: <ReferenceBookForm />,
  },
  {
    path: "/audiobookform/:id",
    element: <AudioBookForm />,
  },
  {
    path: "/dvdform/:id",
    element: <DvdForm />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
