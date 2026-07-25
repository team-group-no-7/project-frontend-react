import {
  Clock3,
  CircleCheckBig,
  Timer,
} from "lucide-react";

const iconMap = {
  orange: Clock3,
  green: CircleCheckBig,
  purple: Timer,
};

const bgMap = {
  orange: "bg-orange-100",
  green: "bg-green-100",
  purple: "bg-purple-100",
};

const textMap = {
  orange: "text-orange-600",
  green: "text-green-600",
  purple: "text-purple-600",
};

function StatsCard({
  value,
  title,
  subtitle,
  color,
}) {
  const Icon = iconMap[color];

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${bgMap[color]}`}
      >
        <Icon
          className={textMap[color]}
          size={28}
        />
      </div>

      <h2 className="text-4xl font-bold">
        {value}
      </h2>

      <p className="mt-2 text-lg font-semibold">
        {title}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {subtitle}
      </p>

    </div>
  );
}

export default StatsCard;