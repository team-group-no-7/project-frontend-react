import ResourceRow from "./ResourceRow";

function ResourceTable({
    resources,
    setSelectedResource,
    setEditingResource,
    setDeletingResource,
    setMetadataResource,
    handleDuplicate,
    handleUnpublish,
    handleRepublish,
}){

  return (

    <section className="rounded-2xl bg-white shadow-sm overflow-hidden">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">Thumbnail</th>

            <th className="px-6 py-4 text-left">Resource</th>

            <th className="px-6 py-4 text-left">Category</th>

            <th className="px-6 py-4 text-left">Type</th>

            <th className="px-6 py-4 text-left">Size</th>

            <th className="px-6 py-4 text-left">Status</th>

            <th className="px-6 py-4 text-left">Updated</th>

            <th className="px-6 py-4 text-left">Actions</th>

          </tr>

        </thead>

        <tbody>

            {resources.length > 0 ? (

                resources.map((resource) => (
                  <ResourceRow
                      key={resource.id}
                      resource={resource}
                      setSelectedResource={setSelectedResource}
                      setEditingResource={setEditingResource}
                      setDeletingResource={setDeletingResource}
                      setMetadataResource={setMetadataResource}
                      handleDuplicate={handleDuplicate}
                      handleUnpublish={handleUnpublish}
                      handleRepublish={handleRepublish}
                  />
              ))

            ) : (

                <tr>
                <td
                    colSpan="8"
                    className="py-10 text-center text-slate-500"
                >
                    No resources found.
                </td>
                </tr>

            )}

        </tbody>

      </table>

    </section>

  );

}

export default ResourceTable;