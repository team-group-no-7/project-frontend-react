import { useState } from "react";
import { toast } from "react-toastify";
function AddResourceModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const initialForm = {
    title: "",
    category: "Programming",
    type: "PDF",
    size: "",
    status: "Draft",
  };
  const [formData, setFormData] = useState(initialForm);
  if (!isOpen) return null;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = () => {
    if (
      !formData.title.trim() ||
      !formData.size.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    onCreate(formData);
    setFormData(initialForm);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold">
          Add New Resource
        </h2>
        <div className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Resource Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option>Programming</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option>PDF</option>
            <option>DOCX</option>
            <option>Video</option>
          </select>
          <input
            type="text"
            name="size"
            placeholder="4.2 MB"
            value={formData.size}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option>Draft</option>
            <option>Published</option>
            <option>Archived</option>
          </select>
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
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Create Resource
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddResourceModal;