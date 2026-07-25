function StatCard({
  title,
  count,
  icon,
  bgColor,
  textColor,
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">
            {count}
          </h2>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${bgColor} ${textColor}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;