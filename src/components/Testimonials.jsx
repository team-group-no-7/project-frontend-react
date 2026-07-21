import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../data/testimonials";

const Testimonials = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
            Testimonials
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900">
            What Our Learners Say
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Thousands of students and creators trust our platform to
            learn, share knowledge, and grow together.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              testimonial={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;