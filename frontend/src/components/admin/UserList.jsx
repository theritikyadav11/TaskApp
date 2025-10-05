const users = [
  {
    id: 1,
    name: "Task 2",
    description: "second task",
    due: { label: "Tomorrow", color: "text-yellow-700" },
    completed: false,
  },
  {
    id: 2,
    name: "Task 3",
    description: "third task",
    due: { label: "Friday", color: "text-purple-700" },
    completed: false,
  },
  {
    id: 3,
    name: "Task 4",
    description: "fourth task",
    due: { label: "23 Oct", color: "text-gray-500" },
    completed: false,
  },
];

export default function UserList() {
  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {users.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-xl shadow border px-6 py-4 flex flex-col"
        >
          <div className="flex items-center">
            {/* Status icon */}
            <span
              className={`w-5 h-5 rounded-full border-2 mr-3 ${
                task.completed
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-400"
              }`}
            />
            <div>
              <div className="font-semibold text-lg">{task.name}</div>
              <div className="text-sm text-gray-500">{task.description}</div>
            </div>
            {/* ... menu */}
            <button className="ml-auto px-2 hover:bg-gray-100 rounded">
              •••
            </button>
          </div>
          <div
            className={`mt-2 text-sm font-medium flex items-center ${task.due.color}`}
          >
            {/* Calendar icon */}
            <svg
              className="inline mr-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 20 20"
            >
              <path d="M6 2v2M14 2v2M3 7h14M5 11h2m2 0h2"></path>
            </svg>
            {task.due.label}
          </div>
        </div>
      ))}
    </div>
  );
}
