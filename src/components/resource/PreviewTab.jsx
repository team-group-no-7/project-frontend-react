import { FaFilePdf, FaLock } from "react-icons/fa";

export default function PreviewTab({ resource }) {
  return (
    <div className="flex flex-col gap-5 py-6">
      <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
        <img
          src={resource.previewImage}
          alt={`Extended preview of ${resource.title}`}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2.5 rounded-2xl bg-gray-50 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <FaFilePdf className="h-4 w-4 text-red-500" />
          Preview — first {resource.previewPages} of {resource.pages} pages
        </div>
        <p className="text-sm leading-relaxed text-gray-600">
          This sample includes the full "List, Set, Map and Queue hierarchies" chapter so you can
          judge the depth and formatting before buying. The complete PDF unlocks instantly after
          purchase.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-gray-100">
        <img
          src={resource.previewImage}
          alt="Locked full document preview"
          className="h-64 w-full object-cover blur-sm sm:h-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900/50 text-center text-white">
          <FaLock className="h-6 w-6" />
          <p className="text-sm font-medium">
            Full {resource.pages}-page document unlocks after purchase
          </p>
        </div>
      </div>
    </div>
  );
}
