import { Bookmark, Star } from "lucide-react";

const ResourceCard = ({ resource }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="overflow-hidden">
        <img
          src={resource.image}
          alt={resource.title}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="space-y-4 p-5">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${resource.badgeColor}`}
        >
          {resource.category}
        </span>

        <h3 className="line-clamp-2 text-lg font-bold text-gray-800">
          {resource.title}
        </h3>

        <div className="flex items-center gap-3">
          <img
            src={resource.avatar}
            alt={resource.author}
            className="h-10 w-10 rounded-full"
          />

          <div>
            <p className="text-sm font-semibold">{resource.author}</p>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star
                size={15}
                className="fill-yellow-400 text-yellow-400"
              />
              {resource.rating}
              <span>({resource.reviews})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-xl font-bold text-indigo-600">
            {resource.price}
          </p>

          <button className="rounded-full p-2 transition hover:bg-indigo-50">
            <Bookmark
              size={20}
              className="text-gray-500 hover:text-indigo-600"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;