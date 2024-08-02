import { Category } from "../types/Category";

export default function ListGroup({ categories }: any) {
  return (
    <div>
      <ul className="list-group">
        {categories.map((category: Category) => (
          <li
            key={category.id}
            className="list-group-item "
            aria-current="true"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
