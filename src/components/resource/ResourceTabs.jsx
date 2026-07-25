const TABS = ["Description", "Preview", "Reviews", "Discussion"];

export default function ResourceTabs({ activeTab, onChange, reviewCount, discussionCount }) {
  const countFor = (tab) => {
    if (tab === "Reviews") return reviewCount;
    if (tab === "Discussion") return discussionCount;
    return null;
  };

  return (
    <div className="sticky top-0 z-10 -mx-4 border-b border-gray-100 bg-white/90 px-4 backdrop-blur sm:mx-0 sm:px-0">
      <div className="flex gap-2 overflow-x-auto sm:gap-6">
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          const count = countFor(tab);
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange(tab)}
              className={`relative whitespace-nowrap px-3 py-4 text-sm font-semibold transition-colors duration-200 ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {count != null && <span className="ml-1.5 text-xs text-gray-400">({count})</span>}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
