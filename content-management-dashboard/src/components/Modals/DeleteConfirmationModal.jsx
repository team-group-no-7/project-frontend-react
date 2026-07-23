import { FaTrash } from "react-icons/fa";
function DeleteConfirmationModal({
  resource,
  isOpen,
  onClose,
  onDelete,
}) {
  if (!isOpen || !resource) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full bg-red-100 p-4">
            <FaTrash className="text-2xl text-red-600" />
          </div>
          <h2 className="text-2xl font-bold">
            Delete Resource?
          </h2>
          <p className="mt-3 text-center text-slate-500">
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}
              "{resource.title}"
            </span>
            ?
          </p>
          <p className="mt-1 text-sm text-red-500">
            This action cannot be undone.
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={onClose}
              className="rounded-lg border px-6 py-3 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete(resource.id);
                onClose();
              }}
              className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmationModal;