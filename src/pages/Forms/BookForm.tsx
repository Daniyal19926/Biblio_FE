import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { getCategories } from "../../Services/Categories";
import { Category } from "../../types/Category";
import { createBook } from "../../Services/Books";
const schema = z.object({
  title: z.string().min(2),
  author: z.string().min(2),
  nbrPages: z.number({ invalid_type_error: "number of page must be a number" }),
  categoryId: z.string().cuid(),
  type: z.enum(["book", "dvd", "audioBook", "referenceBook"], {
    message: "type can only be set as book,referenceBook,dvd,audioBook",
  }),

  borrowerName: z.string().optional(),
});
export type BookFormData = z.infer<typeof schema>;

export default function BookForm() {
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data));
  }, []);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<BookFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FieldValues) {
    await createBook(data);
    navigate("/bookspage");
  }
  return (
    <div className="p-5">
      <h1> Books form {id}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 w-50">
          <label className="form-label">Title</label>
          <input {...register("title")} className="form-control" />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Author</label>
          <input {...register("author")} className="form-control" />
          {errors.author && (
            <p className="text-danger">{errors.author.message}</p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label>Categories</label>
          <select {...register("categoryId")} className="form-select">
            <option />
            {categories.map((category: Category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Number Pages</label>
          <input
            {...register("nbrPages", { valueAsNumber: true })}
            className="form-control"
          />
          {errors.nbrPages && (
            <p className="text-danger">{errors.nbrPages.message}</p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Type</label>
          <input {...register("type")} className="form-control" />
          {errors.type && <p className="text-danger">{errors.type.message}</p>}
        </div>
        {id === "new" ? (
          <></>
        ) : (
          <>
            <div className="mb-3 w-50">
              <label className="form-label">Borrower Name</label>
              <input {...register("borrowerName")} className="form-control" />
              {errors.borrowerName && (
                <p className="text-danger">{errors.borrowerName.message}</p>
              )}
            </div>
          </>
        )}

        <button disabled={!isValid} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
