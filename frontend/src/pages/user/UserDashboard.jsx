import { useEffect, useState } from "react";
import UserLayout from "../../components/user/UserLayout";
import { getUserTasks, updateTaskPriority } from "../../services/tasks";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const handlePriorityChange = async (taskId, newPriority) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      )
    );
    await updateTaskPriority(taskId, newPriority);
  };

  // Eisenhower matrix quadrant tasks filtered by priority
  const doTasks = tasks.filter((task) => task.priority === "urgent");
  const scheduleTasks = tasks.filter((task) => task.priority === "high");
  const delegateTasks = tasks.filter((task) => task.priority === "medium");
  const deleteTasks = tasks.filter((task) => task.priority === "low");

  // Helper function to render tasks with style per quadrant
  const renderTaskList = (quadrantTasks, bgColor, textColor) => {
    if (quadrantTasks.length === 0)
      return <li className="text-gray-500">No tasks</li>;

    return quadrantTasks.map((task) => (
      <li
        key={task.id}
        className={`border rounded-lg p-2 flex flex-col items-center justify-center ${bgColor} ${textColor}`}
      >
        <span className="font-semibold text-center">{task.title}</span>
        <span className="text-xs text-center mt-1">{task.description}</span>
      </li>
    ));
  };

  return (
    <UserLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Task Priority Dashboard</h2>
        <p className="text-gray-600">
          Eisenhower Matrix: Sort tasks by importance and urgency.
        </p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          className="grid grid-cols-2 grid-rows-2 gap-6"
          style={{ minHeight: "60vh" }}
        >
          <div className="bg-green-100 p-5 rounded shadow">
            <h3 className="font-bold mb-1 text-center">Urgent</h3>
            <ul className="space-y-3">
              {renderTaskList(doTasks, "bg-red-400", "text-white")}
            </ul>
          </div>

          <div className="bg-blue-100 p-5 rounded shadow">
            <h3 className="font-bold mb-1 text-center">Important</h3>
            <ul className="space-y-3">
              {renderTaskList(scheduleTasks, "bg-blue-400", "text-white")}
            </ul>
          </div>

          <div className="bg-yellow-100 p-5 rounded shadow">
            <h3 className="font-bold mb-1 text-center">Less Important</h3>
            <ul className="space-y-3">
              {renderTaskList(delegateTasks, "bg-yellow-400", "text-black")}
            </ul>
          </div>

          <div className="bg-red-100 p-5 rounded shadow">
            <h3 className="font-bold mb-1 text-center">Not Important</h3>
            <ul className="space-y-3">
              {renderTaskList(deleteTasks, "bg-red-400", "text-white")}
            </ul>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
