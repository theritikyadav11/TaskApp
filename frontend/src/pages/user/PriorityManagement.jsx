import { useEffect, useState } from "react";
import UserLayout from "../../components/user/UserLayout";
import PriorityBoard from "../../components/user/PriorityBoard";
import { getUserTasks, updateTaskPriority } from "../../services/tasks";

export default function PriorityManagement() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserTasks().then((data) => {
      // Step 7: Ensure every task has `id`
      const mappedTasks = (data || []).map((t) => ({ ...t, id: t._id }));
      setTasks(mappedTasks);
      setLoading(false);
    });
  }, []);

  // When dragging a task to another quadrant, update both UI and DB
  const handlePriorityChange = async (taskId, newPriority) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      )
    );
    await updateTaskPriority(taskId, newPriority);
  };

  return (
    <UserLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Priority Management</h2>
        <p className="text-gray-600">
          Drag and drop your tasks to update their priority in real-time.
        </p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PriorityBoard tasks={tasks} onPriorityChange={handlePriorityChange} />
      )}
    </UserLayout>
  );
}
