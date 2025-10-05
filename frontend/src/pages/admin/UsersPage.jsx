import { useEffect, useState } from "react";
import {
  getUsers,
  getUserDetails,
  deleteUser,
  assignTaskToUser,
} from "../../services/users";
import AdminLayout from "../../components/admin/AdminLayout";
import UserBox from "../../components/admin/UserBox";
import AssignTaskForm from "../../components/admin/AssignTaskForm";
import Button from "../../components/shared/Button";
import DeleteUserModal from "../../components/admin/DeleteUserModal";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // fetch all users on mount
  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  // fetch details of single user when selected
  const handleUserClick = async (userId) => {
    const user = await getUserDetails(userId);
    setSelectedUser(user);
  };

  // assign handler (now creates new task instead of expecting taskId)
  const handleAssign = async ({ userId, title, description, dueDate }) => {
    await assignTaskToUser(userId, { title, description, dueDate });
    const updated = await getUserDetails(userId);
    setSelectedUser(updated); // refresh tasks for that user
    setAssignOpen(false);
  };

  // delete handler
  const handleDelete = async (userId) => {
    await deleteUser(userId);
    setUsers((prev) => prev.filter((u) => u._id !== userId));
    setSelectedUser(null); // go back to list view
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
      </div>

      {/* If no user selected → show grid of user boxes */}
      {!selectedUser ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserBox
              key={user._id}
              user={user}
              onClick={() => handleUserClick(user._id)}
            />
          ))}
        </div>
      ) : (
        // User details view
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
          <button
            onClick={() => setSelectedUser(null)}
            className="mb-4 text-blue-600 underline"
          >
            ← Back to Users
          </button>

          <h2 className="text-2xl font-bold mb-4">{selectedUser.name}</h2>
          <p>Email: {selectedUser.email}</p>
          <p>UserID: {selectedUser._id}</p>

          <h3 className="mt-6 text-xl font-semibold">Tasks</h3>
          {selectedUser.tasks.length > 0 ? (
            <ul className="list-disc ml-6">
              {selectedUser.tasks.map((task) => (
                <li key={task._id}>
                  {task.title} -{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toDateString()
                    : "No Due Date"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tasks assigned yet</p>
          )}

          <div className="flex space-x-4 mt-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setAssignOpen(true)}
            >
              Assign Task
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete User
            </button>
          </div>

          {/* Assign Task Form */}
          <AssignTaskForm
            isOpen={assignOpen}
            onClose={() => setAssignOpen(false)}
            onAssign={handleAssign}
            user={selectedUser}
          />

          {/* Delete Confirmation Modal */}
          <DeleteUserModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={() => handleDelete(selectedUser._id)}
            user={selectedUser}
          />
        </div>
      )}
    </AdminLayout>
  );
}
