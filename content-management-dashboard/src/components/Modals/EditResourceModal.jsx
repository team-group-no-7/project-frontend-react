import { useEffect, useState } from "react";
function EditResourceModal({
  resource,
  isOpen,
  onClose,
  onSave,
}) {
 const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "",
    tags: "",
    description: "",
});
  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title,
        category: resource.category,
        status: resource.status,
        tags: Array.isArray(resource.tags)
            ? resource.tags.join(", "): "",
        description: resource.description || "",
      });
    }
  }, [resource]);
  if (!isOpen || !resource) return null;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const handleSubmit = () => {
    onSave({
        ...resource,
        ...formData,
        tags: formData.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== ""),
    });
    onClose();
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Edit Resource
        </h2>
        <div className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option>Published</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditResourceModal;