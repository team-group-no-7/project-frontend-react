import {
  FaFolderOpen,
  FaGlobe,
  FaPen,
  FaArchive,
} from "react-icons/fa";

import StatCard from "./StatCard";

function StatsCards({ stats }) {

  const statistics = [
    {
      id: 1,
      title: "Total Resources",
      count: stats.total,
      icon: <FaFolderOpen />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Published",
      count: stats.published,
      icon: <FaGlobe />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      id: 3,
      title: "Draft",
      count: stats.draft,
      icon: <FaPen />,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      id: 4,
      title: "Archived",
      count: stats.archived,
      icon: <FaArchive />,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {statistics.map((item) => (
        <StatCard
          key={item.id}
          title={item.title}
          count={item.count}
          icon={item.icon}
          bgColor={item.bgColor}
          textColor={item.textColor}
        />
      ))}
    </div>
  );
}

export default StatsCards;