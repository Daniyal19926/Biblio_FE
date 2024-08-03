export default function ListGroup({
  selectedCategory,
  categories,
  setSelectedCategory,
}: any) {
  return (
    <div>
      <ul className="list-group">
        {categories.map((category: any) => (
          <li
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
            }}
            className={`list-group-item ${
              selectedCategory === category.id ? "active" : ""
            }`}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
