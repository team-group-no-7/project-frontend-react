import {
  FaEye,
  FaEdit,
  FaCopy,
  FaTrash,
  FaGlobe,
  FaUndo,
  FaTags,
} from "react-icons/fa";

function ActionButtons({
  resource,
  setSelectedResource,
  setEditingResource,
  setDeletingResource,
  setMetadataResource,
  handleDuplicate,
  handleUnpublish,
  handleRepublish,
}) {
  return (
    <div className="flex items-center gap-2">

      {/* View */}
      <button
        onClick={() => setSelectedResource(resource)}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
      >
        <FaEye />
      </button>

      {/* Edit */}
      <button
        onClick={() => setEditingResource(resource)}
        className="rounded-lg p-2 text-blue-500 hover:bg-blue-100"
      >
        <FaEdit />
      </button>

      {/* Metadata */}
      <button
        onClick={() => setMetadataResource(resource)}
        className="rounded-lg p-2 text-purple-600 hover:bg-purple-100"
      >
        <FaTags />
      </button>

      {/* Duplicate */}
      <button
        onClick={() => handleDuplicate(resource)}
        className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-100"
      >
        <FaCopy />
      </button>

      {/* Publish / Unpublish */}
      {resource.status === "Published" ? (
        <button
          onClick={() => handleUnpublish(resource.id)}
          className="rounded-lg p-2 text-orange-500 hover:bg-orange-100"
        >
          <FaUndo />
        </button>
      ) : (
        <button
          onClick={() => handleRepublish(resource.id)}
          className="rounded-lg p-2 text-green-600 hover:bg-green-100"
        >
          <FaGlobe />
        </button>
      )}

      {/* Delete */}
      <button
        onClick={() => setDeletingResource(resource)}
        className="rounded-lg p-2 text-red-500 hover:bg-red-100"
      >
        <FaTrash />
      </button>

    </div>
  );
}

export default ActionButtons;