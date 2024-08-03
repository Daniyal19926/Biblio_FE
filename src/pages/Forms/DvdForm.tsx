import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { getCategories } from "../../Services/Categories";
import { Category } from "../../types/Category";

import { createDvd, getDvd, updateDvd } from "../../Services/Dvds";
const schema = z.object({
  title: z.string().min(2),
  runTimeMinutes: z.number({
    invalid_type_error: "Run time must be a number",
  }),
  categoryId: z.string(),
  type: z.enum(["book", "dvd", "audioBook", "referenceBook"], {
    message: "type can only be set as book,referenceBook,dvd,audioBook",
  }),
});
type FormData = z.infer<typeof schema>;

export default function DvdForm() {
  const [categories, setCategories] = useState([]);
  const [dvd, setdvd] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data));
    if (!id || id === "new") return;
    getDvd(id).then(({ data }) => setdvd(data));
  }, []);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (!id || id === "new") return;
    reset(dvd);
  }, [dvd]);

  async function onSubmit(data: FieldValues) {
    if (!id) return;
    if (id === "new") {
      await createDvd(data);
      navigate("/");
    } else {
      await updateDvd(id, data);
      navigate("/");
    }
  }
  return (
    <div className="p-5">
      <h1> Audio Books form {id}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 w-50">
          <label className="form-label">Title</label>
          <input {...register("title")} className="form-control" />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
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
          <label className="form-label">Run Time</label>
          <input
            {...register("runTimeMinutes", { valueAsNumber: true })}
            className="form-control"
          />
          {errors.runTimeMinutes && (
            <p className="text-danger">{errors.runTimeMinutes.message}</p>
          )}
        </div>
        <div className="mb-3 w-50">
          <label className="form-label">Type</label>
          <input {...register("type")} className="form-control" />
          {errors.type && <p className="text-danger">{errors.type.message}</p>}
          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-primary mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
