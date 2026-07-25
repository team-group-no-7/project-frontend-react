import {
  CalendarDays,
  Clock3,
  Video,
} from "lucide-react";

function SessionCard({
  mentor,
  role,
  title,
  date,
  time,
  platform,
  image,
}) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="flex items-center gap-4">

        <img
          src={image}
          alt={mentor}
          className="h-16 w-16 rounded-full"
        />

        <div>

          <h3 className="text-lg font-semibold">
            {mentor}
          </h3>

          <p className="text-sm text-gray-500">
            {role}
          </p>

        </div>

      </div>

      <h2 className="mt-6 text-xl font-bold">
        {title}
      </h2>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-3">
          <CalendarDays size={18} />
          {date}
        </div>

        <div className="flex items-center gap-3">
          <Clock3 size={18} />
          {time}
        </div>

        <div className="flex items-center gap-3">
          <Video size={18} />
          {platform}
        </div>

      </div>

      <div className="mt-6 flex gap-3">

        <button className="flex-1 rounded-xl bg-indigo-600 py-3 text-white hover:bg-indigo-700">
          Join Session
        </button>

        <button className="flex-1 rounded-xl border border-indigo-600 py-3 text-indigo-600 hover:bg-indigo-50">
          Reschedule
        </button>

      </div>

    </div>
  );
}

export default SessionCard;