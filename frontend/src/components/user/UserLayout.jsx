import UserSidebar from "./UserSidebar";
import { useEffect, useState } from "react";

export default function UserLayout({ children }) {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser?.name || "User");
      } catch {
        setUsername("User");
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">User Dashboard</h1>
          <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 font-semibold">
            {username}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
