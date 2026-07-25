import { FaStar, FaRegThumbsUp } from "react-icons/fa";

function StarRow({ rating, size = "h-3.5 w-3.5" }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className={i < rating ? size : `${size} text-gray-200`} />
      ))}
    </div>
  );
}

function DistributionBar({ stars, percent }) {
  return (
    <div className="flex items-center gap-3 text-xs text-gray-500">
      <span className="w-10 shrink-0">{stars} star</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right">{percent}%</span>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-gray-100 p-4 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{review.name}</p>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>
        </div>
        <StarRow rating={review.rating} />
      </div>

      <p className="text-sm leading-relaxed text-gray-600">{review.review}</p>

      <button
        type="button"
        className="flex w-fit items-center gap-1.5 text-xs font-medium text-gray-400 transition-colors hover:text-blue-600"
      >
        <FaRegThumbsUp className="h-3 w-3" />
        Helpful ({review.helpfulCount})
      </button>
    </div>
  );
}

export default function ReviewsTab({ resource, reviews, distribution }) {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-5 rounded-3xl bg-gray-50 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex flex-col items-center gap-2 sm:border-r sm:border-gray-200 sm:pr-6">
          <span className="text-4xl font-bold text-gray-900">{resource.rating}</span>
          <StarRow rating={Math.round(resource.rating)} size="h-4 w-4" />
          <span className="text-xs text-gray-500">{resource.reviewCount} reviews</span>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          {distribution.map((d) => (
            <DistributionBar key={d.stars} stars={d.stars} percent={d.percent} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
