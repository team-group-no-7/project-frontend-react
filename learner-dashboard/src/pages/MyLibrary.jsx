import DashboardLayout from "../components/layout/DashboardLayout";
import SectionHeader from "../components/common/SectionHeader";
import LibraryCard from "../components/cards/LibraryCard";

import { libraryResources } from "../data/dashboardData";

function MyLibrary() {
  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          My Library
        </h1>

        <p className="mt-2 text-gray-500">
          View and continue reading your purchased resources.
        </p>

      </div>

      <SectionHeader
        title="Purchased Resources"
        buttonText="View All"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {libraryResources.map((resource) => (

          <LibraryCard
            key={resource.id}
            image={resource.image}
            title={resource.title}
            author={resource.author}
            type={resource.type}
            progress={resource.progress}
          />

        ))}

      </div>

    </DashboardLayout>
  );
}

export default MyLibrary;