import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../components/user/UserLayout";
import TaskList from "../../components/user/TaskList";
import TaskForm from "../../components/user/TaskForm";
import DeleteTaskModal from "../../components/admin/DeleteTaskModal";
import {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  updateTaskStatus,
} from "../../services/tasks";

export default function TasksManagement() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [newStatus, setNewStatus] = useState("pending");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getUserTasks();
        setTasks(data || []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    if (selectedTask) setNewStatus(selectedTask.status);
  }, [selectedTask]);

  const handleFormSubmit = async (formData) => {
    try {
      if (formInitialData && formInitialData._id) {
        const updated = await updateTask(formInitialData._id, formData);
        setTasks((tasks) =>
          tasks.map((t) => (t._id === updated._id ? updated : t))
        );
      } else {
        const created = await createTask(formData);
        console.log("Task created (frontend):", created);
        setTasks((tasks) => [...tasks, created]);
      }
      setTaskFormOpen(false);
      setFormInitialData(null);
    } catch (err) {
      console.error("Failed to save task:", err);
      alert("Failed to save task. Check console for details.");
    }
  };

  const handleDelete = async () => {
    if (!taskToDelete?._id) return;
    try {
      await deleteTask(taskToDelete._id);
      setTasks((tasks) => tasks.filter((t) => t._id !== taskToDelete._id));
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task. Check console for details.");
    }
  };

  const handleTaskClick = async (task) => {
    if (!task?._id) return;
    try {
      const latest = await getTask(task._id);
      setSelectedTask(latest);
    } catch (err) {
      console.error("Failed to fetch task:", err);
    }
  };

  return (
    <UserLayout>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Task Management</h2>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
              setTaskFormOpen(true);
              setFormInitialData(null);
            }}
          >
            Add Task
          </button>
        </div>
        <p className="text-gray-600 mb-4">View all your tasks below:</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
        )}

        {selectedTask && (
          <div className="fixed inset-0 backdrop-blur-lg bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-2">{selectedTask.title}</h2>
              <div className="mb-2">
                <b>Task ID:</b> {selectedTask._id}
              </div>
              <div className="mb-2">
                <b>Description:</b> {selectedTask.description}
              </div>
              <div className="mb-2">
                <b>Priority:</b> {selectedTask.priority}
              </div>
              <div className="mb-2">
                <b>Status:</b> {selectedTask.status}
              </div>
              <div className="mb-4">
                <b>Due Date:</b>{" "}
                {selectedTask.dueDate && selectedTask.dueDate.split("T")[0]}
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">
                  Update Status
                </label>
                <select
                  className="w-full border rounded p-2 mb-2"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={async () => {
                    try {
                      const updated = await updateTaskStatus(
                        selectedTask._id,
                        newStatus
                      );
                      setSelectedTask(updated);
                      setTasks((tasks) =>
                        tasks.map((t) => (t._id === updated._id ? updated : t))
                      );
                      alert("Status updated successfully");
                      navigate("/user/tasks");
                    } catch (error) {
                      console.error("Failed to update status:", error);
                      alert("Failed to update status");
                    }
                  }}
                >
                  Update Status
                </button>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => {
                    setTaskFormOpen(true);
                    setFormInitialData(selectedTask);
                    setSelectedTask(null);
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => {
                    setDeleteModalOpen(true);
                    setTaskToDelete(selectedTask);
                    setSelectedTask(null);
                  }}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setSelectedTask(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <TaskForm
          open={taskFormOpen}
          onClose={() => {
            setTaskFormOpen(false);
            setFormInitialData(null);
          }}
          onSubmit={handleFormSubmit}
          initialData={formInitialData}
        />

        {deleteModalOpen && (
          <div className="fixed inset-0 backdrop-blur-lg bg-black/30 flex items-center justify-center z-50">
            <DeleteTaskModal
              isOpen={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={handleDelete}
              task={taskToDelete}
            />
          </div>
        )}
      </div>
    </UserLayout>
  );
}
