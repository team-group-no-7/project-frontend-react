import { Star } from "lucide-react";

export default function ResourceCard({ resource }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-blue-600 shadow-sm backdrop-blur">
          {resource.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h4 className="line-clamp-2 text-sm font-semibold text-gray-900">{resource.title}</h4>
        <p className="text-xs text-gray-500">by {resource.creator}</p>

        <div className="flex items-center gap-1 text-xs text-amber-500">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          <span className="font-semibold text-gray-700">{resource.rating}</span>
          <span className="text-gray-400">({resource.reviewCount})</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">₹{resource.price}</span>
          <button
            type="button"
            className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
