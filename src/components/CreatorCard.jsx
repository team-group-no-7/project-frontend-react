import { Star } from "lucide-react";

const CreatorCard = ({ creator }) => {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="flex items-center gap-4">
        <img
          src={creator.image}
          alt={creator.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-indigo-100"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {creator.name}
          </h3>

          <p className="text-sm text-gray-500">
            {creator.username}
          </p>

          <div className="mt-1 flex items-center gap-1 text-sm">
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-medium">
              {creator.rating}
            </span>

            <span className="text-gray-400">
              ({creator.reviews})
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            {creator.followers} Followers
          </p>
        </div>
      </div>

      <button
        className="
          mt-5
          w-full
          rounded-xl
          border
          border-indigo-500
          py-2.5
          font-medium
          text-indigo-600
          transition-all
          duration-300
          hover:bg-indigo-600
          hover:text-white
        "
      >
        Follow
      </button>
    </div>
  );
};

export default CreatorCard;