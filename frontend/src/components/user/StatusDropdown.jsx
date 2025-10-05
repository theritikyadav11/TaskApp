import { useState } from "react";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function StatusDropdown({ status, onChange, taskId }) {
  const [selected, setSelected] = useState(status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelected(newStatus);
    if (onChange) {
      onChange(taskId, newStatus);
    }
  };

  const getStatusColor = (value) => {
    switch (value) {
      case "pending":
        return "text-yellow-600";
      case "in-progress":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <select
      value={selected}
      onChange={handleStatusChange}
      className={`px-2 py-1 rounded text-xs font-semibold border focus:ring ${getStatusColor(
        selected
      )}`}
    >
      {statusOptions.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className={getStatusColor(opt.value)}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}
