import StatsCard from "../cards/StatsCard";
import { stats } from "../../data/dashboardData";

function StatsSection() {
  return (
    <section
      className="
        grid
        gap-6
        sm:grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {stats.map((item) => (
        <StatsCard
          key={item.id}
          value={item.value}
          title={item.title}
          subtitle={item.subtitle}
          color={item.color}
        />
      ))}
    </section>
  );
}

export default StatsSection;