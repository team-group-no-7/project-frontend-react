import {
  FaStar,
  FaRegBookmark,
  FaShareAlt,
  FaFlag,
  FaGlobe,
  FaLayerGroup,
  FaFileAlt,
  FaWeightHanging,
  FaClock,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";

function MetaRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="flex items-center gap-2 text-gray-500">
        <Icon className="h-3.5 w-3.5 text-blue-500" />
        {label}
      </span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

export default function ResourceInfo({ resource, onBuy, onWishlist, onShare, onReport }) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-2">
        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
          {resource.category}
        </span>

        <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
          {resource.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(resource.rating) ? "h-4 w-4" : "h-4 w-4 text-gray-200"
                }
              />
            ))}
          </div>
          <span className="font-semibold text-gray-800">{resource.rating}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{resource.reviewCount} reviews</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{resource.purchaseCount.toLocaleString("en-IN")} bought</span>
        </div>

        <div className="flex items-center gap-2.5">
          <img
            src={resource.creator.avatar}
            alt={resource.creator.name}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
          />
          <span className="text-sm text-gray-600">by</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-gray-800">
            {resource.creator.name}
            {resource.creator.verified && (
              <FaCheckCircle className="h-3.5 w-3.5 text-blue-500" title="Verified creator" />
            )}
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-3 border-y border-gray-100 py-3">
        <span className="text-3xl font-bold text-gray-900">
          {resource.currency}
          {resource.price}
        </span>
        <span className="text-lg text-gray-400 line-through">
          {resource.currency}
          {resource.originalPrice}
        </span>
        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
          {Math.round((1 - resource.price / resource.originalPrice) * 100)}% off
        </span>
      </div>

      <p className="text-sm leading-relaxed text-gray-600">{resource.shortDescription}</p>

      <div className="rounded-2xl bg-gray-50 px-4">
        <MetaRow icon={FaGlobe} label="Language" value={resource.language} />
        <MetaRow icon={FaLayerGroup} label="Level" value={resource.level} />
        <MetaRow icon={FaFileAlt} label="Pages" value={resource.pages} />
        <MetaRow icon={FaWeightHanging} label="File Size" value={resource.fileSize} />
        <MetaRow icon={FaClock} label="Last Updated" value={resource.lastUpdated} />
      </div>

      <div className="flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <FaTag className="h-2.5 w-2.5" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onBuy}
          className="w-full rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/35 active:scale-[0.99]"
        >
          Buy Now — {resource.currency}
          {resource.price}
        </button>

        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={onWishlist}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-200 py-2.5 text-xs font-medium text-gray-600 transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <FaRegBookmark className="h-4 w-4" />
            Wishlist
          </button>
          <button
            type="button"
            onClick={onShare}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-200 py-2.5 text-xs font-medium text-gray-600 transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <FaShareAlt className="h-4 w-4" />
            Share
          </button>
          <button
            type="button"
            onClick={onReport}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-200 py-2.5 text-xs font-medium text-gray-600 transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            <FaFlag className="h-4 w-4" />
            Report
          </button>
        </div>
      </div>
    </div>
  );
}
