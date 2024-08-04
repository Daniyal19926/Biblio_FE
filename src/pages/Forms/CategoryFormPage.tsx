import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { createCategory, getCategory } from "../../Services/Categories";
const schema = z.object({
  name: z.string().min(3),
});
type CategoryFormData = z.infer<typeof schema>;
export default function CategoriesForm() {
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id || id === "new") return;
    getCategory(id).then(({ data }) => setCategory(data));
  }, [category]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  async function onSubmit(data: FieldValues) {
    await createCategory(data);
    navigate("/");
  }
  return (
    <div className="p-5">
      <h1>Categories Form Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 w-50">
          <label className="form-label">Create Category</label>
          <input {...register("name")} className="form-control" />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
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
