function SectionHeader({
  title,
  buttonText = "View All",
}) {
  return (
    <div className="mb-6 flex items-center justify-between">

      <h2 className="text-2xl font-bold text-slate-900">
        {title}
      </h2>

      <button
        className="
          rounded-xl
          border
          border-indigo-600
          px-4
          py-2
          text-sm
          font-medium
          text-indigo-600
          hover:bg-indigo-50
        "
      >
        {buttonText}
      </button>

    </div>
  );
}

export default SectionHeader;