/**
 * Stats Component — Platform-wide statistics strip shown on LandingPage / Hero.
 * Uses Tailwind classes instead of raw CSS class names.
 */
const STATS = [
  { icon: "📄", number: "10K+",  title: "Resources" },
  { icon: "👨‍🎓", number: "5K+",   title: "Creators" },
  { icon: "👥", number: "50K+",  title: "Learners" },
  { icon: "💰", number: "₹2Cr+", title: "Earned by Creators" },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mx-auto py-6">
      {STATS.map((item) => (
        <div key={item.title} className="flex flex-col items-center gap-1 p-4 bg-white/10 rounded-xl text-center">
          <span className="text-2xl">{item.icon}</span>
          <h3 className="text-xl font-extrabold text-white">{item.number}</h3>
          <p className="text-xs text-indigo-200">{item.title}</p>
        </div>
      ))}
    </div>
  );
}