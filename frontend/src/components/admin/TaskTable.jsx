export default function TaskTable({ tasks, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Assignee</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Due Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">
                {task.assignedTo?.name || "Unassigned"}
              </td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="px-4 py-2">{task.dueDate}</td>
              <td className="px-4 py-2">
                <button className="text-red-600" onClick={() => onDelete(task)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
