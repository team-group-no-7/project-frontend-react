import { formatDate } from "../../utils/dateUtils";

function ResourceModal({
  resource,
  isOpen,
  onClose,
}) {
  if (!isOpen || !resource) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
      "
    >
      <div
        className="
          w-full
          max-w-xl
          rounded-2xl
          bg-white
          p-8
          shadow-xl
        "
      >
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Resource Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-slate-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Content */}

        <div className="space-y-4">

          <div className="text-5xl">
            {resource.thumbnail}
          </div>

          <h3 className="text-2xl font-semibold">
            {resource.title}
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <Info label="Category" value={resource.category} />

            <Info label="Type" value={resource.type} />

            <Info label="Size" value={resource.size} />

            <Info label="Status" value={resource.status} />

            <Info label="Updated" value={formatDate(resource.updated)} />

            <Info label="Author" value="Riya Raj" />

          </div>

          <div>

            <h4 className="font-semibold">
              Description
            </h4>

            <p className="mt-2 text-slate-600">
              This resource contains comprehensive learning
              material, examples, exercises, and reference
              notes for students.
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end">

          <button
            onClick={onClose}
            className="
              rounded-xl
              bg-blue-600
              px-6
              py-3
              text-white
              hover:bg-blue-700
            "
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="font-medium">
        {value}
      </p>

    </div>
  );
}

export default ResourceModal;