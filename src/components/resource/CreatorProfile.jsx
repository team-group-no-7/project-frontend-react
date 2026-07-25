import { CheckCircle2, Star, BookOpen } from "lucide-react";

export default function CreatorProfile({ creator }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-4 ring-blue-50 sm:h-20 sm:w-20"
        />

        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">{creator.name}</h3>
            {creator.verified && (
              <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                <CheckCircle2 className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-gray-600">{creator.bio}</p>

          <div className="flex flex-wrap gap-2 pt-1">
            {creator.specializations.map((spec) => (
              <span
                key={spec}
                className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-5 border-t border-gray-100 pt-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="h-3.5 w-3.5 text-blue-500" />
              <span className="font-semibold text-gray-800">{creator.publishedResources}</span>
              resources
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span className="font-semibold text-gray-800">{creator.averageRating}</span>
              avg. rating
            </div>
            <div className="text-gray-600">
              <span className="font-semibold text-gray-800">
                {creator.followers.toLocaleString("en-IN")}
              </span>{" "}
              followers
            </div>
          </div>

          <div className="mt-1 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              className="flex-1 rounded-2xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex-none sm:px-6"
            >
              Visit Profile
            </button>
            <button
              type="button"
              className="flex-1 rounded-2xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 sm:flex-none sm:px-6"
            >
              Follow Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
