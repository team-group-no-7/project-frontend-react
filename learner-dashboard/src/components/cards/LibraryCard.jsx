import {
  FileText,
  BookOpen,
  Download,
} from "lucide-react";

function LibraryCard({
  image,
  title,
  author,
  type,
  progress,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:shadow-lg">

      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">

        <div className="mb-4 flex items-center gap-2">

          <FileText
            size={18}
            className="text-indigo-600"
          />

          <span className="text-sm text-indigo-600">
            {type}
          </span>

        </div>

        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-gray-500">
          {author}
        </p>

        {/* Progress */}

        <div className="mt-5">

          <div className="mb-2 flex justify-between">

            <span>Reading</span>

            <span>{progress}%</span>

          </div>

          <div className="h-2 rounded-full bg-gray-200">

            <div
              className="h-2 rounded-full bg-indigo-600"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-6 flex gap-3">

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-white">

            <BookOpen size={18} />

            Read

          </button>

          <button className="rounded-xl border p-3">

            <Download size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default LibraryCard;