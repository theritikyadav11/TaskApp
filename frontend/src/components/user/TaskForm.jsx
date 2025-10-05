import { useState, useEffect } from "react";

export default function TaskForm({ open, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDueDate(initialData.dueDate ? initialData.dueDate.split("T")[0] : "");
      setPriority(initialData.priority || "medium");
      setStatus(initialData.status || "pending");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      dueDate,
      priority,
      status,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-black/30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Task" : "Add Task"}
        </h2>

        <label className="block mb-2">Title</label>
        <input
          type="text"
          className="w-full border p-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2">Description</label>
        <textarea
          className="w-full border p-2 mb-4 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mb-2">Due Date</label>
        <input
          type="date"
          className="w-full border p-2 mb-4 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label className="block mb-2">Priority</label>
        <select
          className="w-full border p-2 mb-4 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
