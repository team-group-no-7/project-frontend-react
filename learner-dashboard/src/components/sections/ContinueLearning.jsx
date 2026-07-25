import CourseCard from "../cards/CourseCard";
import SectionHeader from "../common/SectionHeader";

import { courses } from "../../data/dashboardData";

function ContinueLearning() {
  return (
    <section className="mt-10">

      <SectionHeader
        title="Continue Learning"
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

        {courses.map((course) => (
          <CourseCard
            key={course.id}
            image={course.image}
            title={course.title}
            progress={course.progress}
          />
        ))}

      </div>

    </section>
  );
}

export default ContinueLearning;