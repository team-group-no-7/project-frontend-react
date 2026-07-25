import { useState } from "react";
import { useEffect } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import StatsCards from "../components/StatsCards/StatsCards";
import Toolbar from "../components/Toolbar/Toolbar";
import ResourceTable from "../components/ResourceTable/ResourceTable";
import Pagination from "../components/Pagination/Pagination";
import ResourceModal from "../components/Modals/ResourceModal";
import EditResourceModal from "../components/Modals/EditResourceModal";
import DeleteConfirmationModal from "../components/Modals/DeleteConfirmationModal";
import AddResourceModal from "../components/Modals/AddResourceModal";
import MetadataModal from "../components/Modals/MetadataModal";

import { toast } from "react-toastify";

import resourcesData from "../data/resources";
import { parseDate } from "../utils/dateUtils";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedResource, setSelectedResource] = useState(null);
  const [resources, setResources] = useState(() => {

  const savedResources = localStorage.getItem("resources");

  if (savedResources) {
    try {
      const parsed = JSON.parse(savedResources);
      return parsed.map((item) => ({
        ...item,
        updated: parseDate(item.updated).toISOString(),
      }));
    } catch (e) {
      console.error(e);
    }
  }

  return resourcesData;

});

const [editingResource, setEditingResource] = useState(null);
const [deletingResource, setDeletingResource] = useState(null);
const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  useEffect(() => {
  setCurrentPage(1);
}, [search, category, status, sortBy]);

useEffect(() => {

  localStorage.setItem(
    "resources",
    JSON.stringify(resources)
  );

}, [resources]);

const handleUpdateResource = (updatedResource) => {

  setResources((prevResources) =>
    prevResources.map((resource) =>
      resource.id === updatedResource.id
        ? updatedResource
        : resource
    )
  );

  toast.success("Resource updated successfully!");
};

  const filteredResources = resources
    .filter((resource) =>
      resource.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (resource) =>
        category === "All Categories" ||
        resource.category === category
    )
    .filter(
      (resource) =>
        status === "All Status" ||
        resource.status === status
    );

const sortedResources = [...filteredResources].sort((a, b) => {

  switch (sortBy) {

    case "Newest":
      return parseDate(b.updated) - parseDate(a.updated);

    case "Oldest":
      return parseDate(a.updated) - parseDate(b.updated);

    case "Name A-Z":
      return a.title.localeCompare(b.title);

    case "Name Z-A":
      return b.title.localeCompare(a.title);

    default:
      return 0;
  }

});

const totalPages = Math.ceil(
  sortedResources.length / itemsPerPage
);

const startIndex = (currentPage - 1) * itemsPerPage;

const paginatedResources = sortedResources.slice(
  startIndex,
  startIndex + itemsPerPage
);

const handleDeleteResource = (id) => {

  setResources((prevResources) =>
    prevResources.filter(
      (resource) => resource.id !== id
    )
  );

  toast.success("Resource deleted successfully!");
};

const handleCreateResource = (newResource) => {

  const resource = {
    id: Date.now(),
    thumbnail: "📄",
    updated: new Date().toISOString(),
    ...newResource,
  };

  setResources((prev) => [
    resource,
    ...prev,
  ]);
  toast.success("Resource created successfully!");
};

const stats = {
  total: resources.length,

  published: resources.filter(
    (resource) => resource.status === "Published"
  ).length,

  draft: resources.filter(
    (resource) => resource.status === "Draft"
  ).length,

  archived: resources.filter(
    (resource) => resource.status === "Archived"
  ).length,


};

const [metadataResource, setMetadataResource] =
    useState(null);

    const handleUnpublish = (id) => {

    setResources(prev =>

        prev.map(resource =>

            resource.id === id

                ? {
                      ...resource,

                      status: "Draft",
                  }

                : resource
        )

    );

    toast.info("Resource unpublished.");

};

const handleRepublish = (id) => {

    setResources(prev =>

        prev.map(resource =>

            resource.id === id

                ? {
                      ...resource,

                      status: "Published",
                  }

                : resource
        )

    );

    toast.success("Resource published.");

};

const handleDuplicate = (resource) => {

    const copy = {

        ...resource,

        id: Date.now(),

        title: `${resource.title} (Copy)`,

        updated: new Date().toISOString(),

        status: "Draft",

    };

    setResources(prev => [

        copy,

        ...prev,

    ]);

    toast.success("Resource duplicated.");

};

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 lg:ml-64">
        
          <Header />

          <StatsCards stats={stats} />

          <Toolbar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onAddResource={() => setIsAddModalOpen(true)}
        />

        <ResourceTable
            resources={paginatedResources}
            setSelectedResource={setSelectedResource}
            setEditingResource={setEditingResource}
            setDeletingResource={setDeletingResource}
            setMetadataResource={setMetadataResource}
            handleDuplicate={handleDuplicate}
            handleUnpublish={handleUnpublish}
            handleRepublish={handleRepublish}
        />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
        />

        <ResourceModal
            resource={selectedResource}
            isOpen={selectedResource !== null}
            onClose={() => setSelectedResource(null)}
        />

        <EditResourceModal
            resource={editingResource}
            isOpen={editingResource !== null}
            onClose={() => setEditingResource(null)}
            onSave={handleUpdateResource}
        />

        <DeleteConfirmationModal
            resource={deletingResource}
            isOpen={deletingResource !== null}
            onClose={() => setDeletingResource(null)}
            onDelete={handleDeleteResource}
        />

        <AddResourceModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onCreate={handleCreateResource}
        />

        <MetadataModal

            resource={metadataResource}

            isOpen={metadataResource !== null}

            onClose={() => setMetadataResource(null)}

            onSave={handleUpdateResource}

        />
       
      </main>
    </div>
  );
}

export default Dashboard;