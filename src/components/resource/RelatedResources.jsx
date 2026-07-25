import ResourceCard from "./ResourceCard";

export default function RelatedResources({ resources }) {
  return (
    <section className="flex flex-col gap-4 py-4">
      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">You may also like</h3>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
