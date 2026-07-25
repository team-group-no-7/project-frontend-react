import { Play, Maximize, FileText } from "lucide-react";

export default function ResourcePreview({ resource, onPreview, onFullscreen }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gray-900 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={resource.previewImage}
          alt={`Preview of ${resource.title}`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
            <FileText className="h-3 w-3 text-red-500" />
            {resource.fileType}
          </span>
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
            {resource.pages} pages
          </span>
        </div>

        {/* Fullscreen button */}
        <button
          type="button"
          onClick={onFullscreen}
          aria-label="View fullscreen"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:text-blue-600 cursor-pointer"
        >
          <Maximize className="h-3.5 w-3.5" />
        </button>

        {/* Preview button */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6">
          <button
            type="button"
            onClick={onPreview}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-[1.03] hover:bg-blue-700 active:scale-[0.98] cursor-pointer"
          >
            <Play className="h-3 w-3" />
            Preview first {resource.previewPages} pages
          </button>
        </div>
      </div>
    </div>
  );
}
