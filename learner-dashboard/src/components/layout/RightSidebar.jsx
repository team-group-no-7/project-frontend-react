import {
  CalendarDays,
  Clock3,
  Video,
  CheckCircle2,
  Circle,
} from "lucide-react";

function RightSidebar() {
  return (
    <aside className="hidden xl:block w-96 border-l bg-white p-6">

      {/* Upcoming Session */}
      <div className="rounded-2xl border p-5 shadow-sm">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Upcoming Session
          </h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
            Live Soon
          </span>
        </div>

        {/* Mentor */}

        <div className="mb-6 flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Mentor"
            className="h-14 w-14 rounded-full"
          />

          <div>

            <h3 className="font-semibold">
              Rahul Sharma
            </h3>

            <p className="text-sm text-gray-500">
              Senior Engineer @ Google
            </p>

          </div>

        </div>

        {/* Session Title */}

        <div className="rounded-xl bg-indigo-50 p-4">

          <p className="font-semibold text-indigo-700">
            Advanced System Design Patterns
          </p>

        </div>

        {/* Details */}

        <div className="mt-6 space-y-4 text-sm">

          <div className="flex items-center gap-3">
            <CalendarDays size={18} />
            <span>25 May 2024 (Sat)</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock3 size={18} />
            <span>07:00 PM - 08:00 PM</span>
          </div>

          <div className="flex items-center gap-3">
            <Video size={18} />
            <span>Google Meet</span>
          </div>

        </div>

        {/* Buttons */}

        <div className="mt-8 grid grid-cols-2 gap-3">

          <button className="rounded-xl border border-indigo-600 py-3 font-medium text-indigo-600 hover:bg-indigo-50">
            Reschedule
          </button>

          <button className="rounded-xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700">
            Join Session
          </button>

        </div>

      </div>

      {/* About Session */}

      <div className="mt-8">

        <h3 className="mb-3 text-lg font-semibold">
          About this Session
        </h3>

        <p className="text-sm leading-6 text-gray-600">
          A deep dive into scalable architecture, distributed
          systems, event-driven communication and real-world
          system design used in modern software companies.
        </p>

      </div>

      {/* Agenda */}

      <div className="mt-8">

        <h3 className="mb-5 text-lg font-semibold">
          Session Agenda
        </h3>

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <CheckCircle2
              className="text-green-500"
              size={18}
            />
            Introduction
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2
              className="text-green-500"
              size={18}
            />
            Key Concepts
          </div>

          <div className="flex items-center gap-3">
            <Circle size={18} />
            Discussion
          </div>

          <div className="flex items-center gap-3">
            <Circle size={18} />
            Q & A
          </div>

        </div>

      </div>

    </aside>
  );
}

export default RightSidebar;