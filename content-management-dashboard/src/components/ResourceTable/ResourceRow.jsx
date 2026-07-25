import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";
import { formatDate } from "../../utils/dateUtils";

function ResourceRow({
    resource,
    setSelectedResource,
    setEditingResource,
    setDeletingResource,
    setMetadataResource,
    handleDuplicate,
    handleUnpublish,
    handleRepublish,
}){

  return (

    <tr className="border-b hover:bg-slate-50 transition">

      <td className="px-6 py-4 text-2xl">

        {resource.thumbnail}

      </td>

      <td className="px-6 py-4 font-medium">

        {resource.title}

      </td>

      <td className="px-6 py-4">

        {resource.category}

      </td>

      <td className="px-6 py-4">

        {resource.type}

      </td>

      <td className="px-6 py-4">

        {resource.size}

      </td>

      <td className="px-6 py-4">

        <StatusBadge status={resource.status} />

      </td>

      <td className="px-6 py-4">
          {formatDate(resource.updated)}
      </td>

      <td className="px-6 py-4">

      <ActionButtons
            resource={resource}
            setSelectedResource={setSelectedResource}
            setEditingResource={setEditingResource}
            setDeletingResource={setDeletingResource}
            setMetadataResource={setMetadataResource}
            handleDuplicate={handleDuplicate}
            handleUnpublish={handleUnpublish}
            handleRepublish={handleRepublish}
        />

      </td>

    </tr>

  );

}

export default ResourceRow;