// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import TasksPage from "./pages/admin/TasksPage";

// User
import UserDashboard from "./pages/user/UserDashboard";
import TasksManagement from "./pages/user/TasksManagement";
import PriorityManagement from "./pages/user/PriorityManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/tasks" element={<TasksPage />} />

        {/* User routes */}
        <Route path="/user/" element={<UserDashboard />} />
        <Route path="/user/tasks" element={<TasksManagement />} />
        <Route path="/user/priority" element={<PriorityManagement />} />
      </Routes>
    </BrowserRouter>
  );
}
