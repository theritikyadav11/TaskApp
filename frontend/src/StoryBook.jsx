import React from "react";
import UserList from "./components/admin/UserList";
import AdminLayout from "./components/admin/AdminLayout";
import AssignTaskForm from "./components/admin/AssignTaskForm";
import DeleteUserModal from "./components/admin/DeleteUserModal";
import TaskTable from "./components/admin/TaskTable";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import TasksPage from "./pages/admin/TasksPage";

const StoryBook = () => {
  return (
    <div>
      <AdminDashboard />
      {/* <UsersPage /> */}
      {/* <TasksPage /> */}
      {/* <UserList /> */}
    </div>
  );
};

export default StoryBook;
