function StatusBadge({ status }) {

  const colors = {
    Published: "bg-green-100 text-green-700",
    Draft: "bg-yellow-100 text-yellow-700",
    Archived: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;