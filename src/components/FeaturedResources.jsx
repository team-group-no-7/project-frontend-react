import { ArrowRight } from "lucide-react";
import ResourceCard from "./ResourceCard";
import { resources } from "../data/resources";

const FeaturedResources = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Featured Resources
            </h2>

            <p className="mt-2 text-gray-500">
              Explore our most popular learning materials.
            </p>
          </div>

          <button className="hidden items-center gap-2 font-semibold text-indigo-600 transition hover:gap-3 md:flex">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {resources.map((item) => (
            <ResourceCard key={item.id} resource={item} />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <button className="flex items-center gap-2 rounded-lg border border-indigo-500 px-5 py-3 font-semibold text-indigo-600">
            View All
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedResources;