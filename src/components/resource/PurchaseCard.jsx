import { FaStar, FaInfinity, FaDownload, FaLock } from "react-icons/fa";

export default function PurchaseCard({ resource, onBuy }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 flex flex-col gap-3 rounded-3xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-200/50">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {resource.currency}
            {resource.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {resource.currency}
            {resource.originalPrice}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <FaStar className="h-3.5 w-3.5 text-amber-500" />
          <span className="font-semibold text-gray-800">{resource.rating}</span>
          <span className="text-gray-400">({resource.reviewCount} reviews)</span>
        </div>

        <button
          type="button"
          onClick={onBuy}
          className="w-full rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 active:scale-[0.99]"
        >
          Buy Now
        </button>

        <ul className="flex flex-col gap-2.5 border-t border-gray-100 pt-3 text-sm text-gray-600">
          <li className="flex items-center gap-2.5">
            <FaInfinity className="h-3.5 w-3.5 text-blue-500" />
            Lifetime access
          </li>
          <li className="flex items-center gap-2.5">
            <FaDownload className="h-3.5 w-3.5 text-blue-500" />
            Instant download
          </li>
          <li className="flex items-center gap-2.5">
            <FaLock className="h-3.5 w-3.5 text-blue-500" />
            Secure payment
          </li>
        </ul>
      </div>
    </aside>
  );
}
