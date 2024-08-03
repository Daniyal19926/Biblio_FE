import { Link } from "react-router-dom";

export default function SimpleListGroup({ categories }: any) {
  return (
    <div>
      <ul className="list-group">
        {categories.map((category: any) => (
          <li key={category.id} className="list-group-item">
            <Link to={""}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
