import { FolderOpen } from "lucide-react";

function EmptyState({
  title,
  description,
  buttonText,
}) {
  return (
    <div className="rounded-3xl border border-dashed bg-white p-12 text-center">

      <FolderOpen
        size={64}
        className="mx-auto text-indigo-600"
      />

      <h2 className="mt-6 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">
        {description}
      </p>

      <button className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
        {buttonText}
      </button>

    </div>
  );
}

export default EmptyState;