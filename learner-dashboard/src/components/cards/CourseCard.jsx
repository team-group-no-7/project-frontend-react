import { PlayCircle } from "lucide-react";

function CourseCard({
  image,
  title,
  progress,
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        bg-white
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      {/* Thumbnail */}

      <img
        src={image}
        alt={title}
        className="h-44 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Continue from where you left off.
        </p>

        {/* Progress */}

        <div className="mt-5">

          <div className="mb-2 flex justify-between">

            <span className="text-sm font-medium">
              Progress
            </span>

            <span className="text-sm font-semibold text-indigo-600">
              {progress}%
            </span>

          </div>

          <div className="h-2 rounded-full bg-gray-200">

            <div
              className="h-2 rounded-full bg-indigo-600"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

        </div>

        {/* Button */}

        <button
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-indigo-600
            py-3
            font-medium
            text-white
            hover:bg-indigo-700
          "
        >

          <PlayCircle size={20} />

          Continue Learning

        </button>

      </div>

    </div>
  );
}

export default CourseCard;