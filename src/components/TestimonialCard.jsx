import { Quote, Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div
      className="
      group
      rounded-3xl
      border
      border-gray-200
      bg-white
      p-7
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
    "
    >
      {/* Quote Icon */}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
        <Quote className="text-indigo-600" size={22} />
      </div>

      {/* Review */}
      <p className="leading-7 text-gray-600">
        "{testimonial.review}"
      </p>

      {/* Rating */}
      <div className="mt-6 flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* User */}
      <div className="mt-7 flex items-center gap-4 border-t pt-5">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold text-gray-900">
            {testimonial.name}
          </h4>

          <p className="text-sm text-gray-500">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;