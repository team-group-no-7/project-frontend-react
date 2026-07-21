import { ArrowRight } from "lucide-react";
import CreatorCard from "./CreatorCard";
import { creators } from "../data/creators";

const TopCreators = () => {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Top Creators
            </h2>

            <p className="mt-2 text-gray-500">
              Learn from our most popular educators.
            </p>
          </div>

          <button className="hidden items-center gap-2 font-semibold text-indigo-600 transition-all hover:gap-3 md:flex">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
            />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <button className="flex items-center gap-2 rounded-xl border border-indigo-500 px-5 py-3 font-semibold text-indigo-600">
            View All
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopCreators;