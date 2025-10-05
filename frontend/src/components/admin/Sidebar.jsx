import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { logout } from "../../services/auth"; // path to your auth service

const menu = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/users", label: "User Management" },
  { path: "/admin/tasks", label: "Tasks" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // call logout API + clear tokens
      navigate("/"); // redirect to landing
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {/* Hamburger icon */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-gray-900 text-white rounded"
            aria-label="Open sidebar"
          >
            <FiMenu size={24} />
          </button>
        )}
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col py-8 px-4 border-r border-gray-200
          transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
        `}
      >
        {/* Header */}
        <div className="mb-8 px-2 flex justify-between items-center">
          <span className="font-bold text-lg">Admin</span>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white"
            aria-label="Close sidebar"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {menu.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded text-base font-medium
                    transition hover:bg-gray-800 ${
                      isActive ? "bg-gray-800 font-semibold" : ""
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button at bottom */}
        <div className="mt-auto px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
            aria-label="Logout"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
