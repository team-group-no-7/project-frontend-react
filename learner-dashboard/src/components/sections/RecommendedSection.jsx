import ResourceCard from "../cards/ResourceCard";
import SectionHeader from "../common/SectionHeader";

import { resources } from "../../data/dashboardData";

function RecommendedSection() {
  return (
    <section className="mt-12">

      <SectionHeader
        title="Recommended Resources"
        buttonText="Browse All"
      />

      <div
        className="
          grid
          gap-6
          sm:grid-cols-1
          md:grid-cols-2
          xl:grid-cols-2
        "
      >
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            image={resource.image}
            title={resource.title}
            author={resource.author}
            rating={resource.rating}
            price={resource.price}
          />
        ))}

      </div>

    </section>
  );
}

export default RecommendedSection;