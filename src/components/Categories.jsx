import CategoryCard from "./CategoryCard";

function Categories() {

  const categories = [
    {
      icon: "📘",
      title: "Notes",
      resources: "2345 Resources",
    },
    {
      icon: "📄",
      title: "Articles",
      resources: "1234 Resources",
    },
    {
      icon: "💻",
      title: "Projects",
      resources: "1876 Resources",
    },
    {
      icon: "📚",
      title: "Study Guides",
      resources: "2545 Resources",
    },
    {
      icon: "🎯",
      title: "Interview",
      resources: "941 Resources",
    },
  ];

  return (
    <section className="categories">
      <div className="container">

        <div className="section-header">
          <h2>Top Categories</h2>
          <a href="#">View All →</a>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              resources={category.resources}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;