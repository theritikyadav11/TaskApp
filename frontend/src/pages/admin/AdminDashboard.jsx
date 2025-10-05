import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/users";
import { getTasks } from "../../services/tasks";
import AdminLayout from "../../components/admin/AdminLayout";
import Button from "../../components/shared/Button";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Fetch users
    getUsers().then((users) => setUserCount(users.length));

    // Fetch tasks
    getTasks().then((data) => {
      setTaskCount(data.tasks.length);
      setPendingCount(data.tasks.filter((t) => t.status === "pending").length);
    });
  }, []);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome, Admin!</h2>
        <p className="text-gray-600">
          Here’s a quick overview of your workspace.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded shadow p-6">
          <div className="text-lg font-semibold">Total Users</div>
          <div className="text-3xl font-bold mt-2">{userCount}</div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div className="text-lg font-semibold">Total Tasks</div>
          <div className="text-3xl font-bold mt-2">{taskCount}</div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div className="text-lg font-semibold">Pending Tasks</div>
          <div className="text-3xl font-bold mt-2">{pendingCount}</div>
        </div>
      </div>

      {/* User Management Button */}
      <Link to="/admin/users">
        <Button variant="primary">Go to User Management</Button>
      </Link>
    </AdminLayout>
  );
}
