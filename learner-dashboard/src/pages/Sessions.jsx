import DashboardLayout from "../components/layout/DashboardLayout";
import SectionHeader from "../components/common/SectionHeader";
import SessionCard from "../components/cards/SessionCard";
import PreviousSessionCard from "../components/cards/PreviousSessionCard";

import {
  upcomingSessions,
  previousSessions,
} from "../data/dashboardData";

function Sessions() {
  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          My Sessions
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your upcoming and previous learning sessions.
        </p>

      </div>

      <SectionHeader
        title="Upcoming Sessions"
        buttonText="View Calendar"
      />

      <div className="grid gap-6 lg:grid-cols-2">

        {upcomingSessions.map((session) => (
          <SessionCard
            key={session.id}
            {...session}
          />
        ))}

      </div>

      <div className="mt-12">

        <SectionHeader
          title="Previous Sessions"
          buttonText="View All"
        />

        <div className="grid gap-6 lg:grid-cols-2">

          {previousSessions.map((session) => (
            <PreviousSessionCard
              key={session.id}
              {...session}
            />
          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Sessions;