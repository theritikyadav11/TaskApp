// Priority colors for frontend
const priorityColors = {
  urgent: "bg-red-500",
  important: "bg-orange-400",
  notImportant: "bg-yellow-300",
  lessImportant: "bg-green-400",
};

// Backend enum to frontend label
const backendToFrontendPriority = {
  urgent: "urgent",
  high: "important",
  medium: "notImportant",
  low: "lessImportant",
};

export default function TaskCard({ task, onTaskClick }) {
  const frontendPriority =
    backendToFrontendPriority[task.priority] || "notImportant";
  const priorityClass = priorityColors[frontendPriority] || "bg-gray-300";

  return (
    <div
      className="bg-white rounded-lg shadow p-4 w-full max-w-sm cursor-pointer hover:ring-2 transition"
      onClick={() => onTaskClick(task)}
      tabIndex={0}
      role="button"
      onKeyPress={(e) => {
        if (e.key === "Enter") onTaskClick(task);
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span
          className={`text-white px-2 py-1 rounded ${priorityClass} text-xs lowercase`}
        >
          {/* {frontendPriority.replace(/([A-Z])/g, " $1").toLowerCase()} */}
          {task.priority}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>Due: {task.dueDate && task.dueDate.split("T")[0]}</div>
        <div>Status: {task.status}</div>
      </div>
    </div>
  );
}
