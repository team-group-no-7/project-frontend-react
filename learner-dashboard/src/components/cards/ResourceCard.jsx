import { Star, FileText, ShoppingCart } from "lucide-react";

function ResourceCard({
  image,
  title,
  author,
  rating,
  price,
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        bg-white
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Thumbnail */}

      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">

        {/* Badge */}

        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">

          <FileText size={15} />

          PDF Resource

        </div>

        {/* Title */}

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        {/* Author */}

        <p className="mt-2 text-sm text-gray-500">
          by {author}
        </p>

        {/* Rating */}

        <div className="mt-4 flex items-center gap-2">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-medium">
            {rating}
          </span>

        </div>

        {/* Bottom */}

        <div className="mt-6 flex items-center justify-between">

          <h2 className="text-xl font-bold text-indigo-600">
            {price}
          </h2>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-4
              py-2
              text-white
              hover:bg-indigo-700
            "
          >
            <ShoppingCart size={18} />

            Buy

          </button>

        </div>

      </div>
    </div>
  );
}

export default ResourceCard;