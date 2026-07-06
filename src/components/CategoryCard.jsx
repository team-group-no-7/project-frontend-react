function CategoryCard({ icon, title, resources }) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{resources}</p>
    </div>
  );
}

export default CategoryCard;