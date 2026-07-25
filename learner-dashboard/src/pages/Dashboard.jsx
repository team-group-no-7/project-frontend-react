import DashboardLayout from "../components/layout/DashboardLayout";

import WelcomeBanner from "../components/sections/WelcomeBanner";
import StatsSection from "../components/sections/StatsSection";
import ContinueLearning from "../components/sections/ContinueLearning";
import RecommendedSection from "../components/sections/RecommendedSection";

function Dashboard() {
  return (
    <DashboardLayout>

      <WelcomeBanner />

      <StatsSection />

      <ContinueLearning />

      <RecommendedSection />

    </DashboardLayout>
  );
}

export default Dashboard;