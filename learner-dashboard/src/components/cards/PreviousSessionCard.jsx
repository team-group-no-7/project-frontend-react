import { PlayCircle } from "lucide-react";

function PreviousSessionCard({
  mentor,
  title,
  date,
  duration,
  status,
}) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
          {status}
        </span>

      </div>

      <p className="mt-3 text-gray-500">
        Mentor: {mentor}
      </p>

      <p className="mt-2 text-gray-500">
        {date}
      </p>

      <p className="mt-2 text-gray-500">
        Duration: {duration}
      </p>

      <button className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700">

        <PlayCircle size={18} />

        Watch Recording

      </button>

    </div>
  );
}

export default PreviousSessionCard;