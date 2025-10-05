import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const [username, setUsername] = useState("Admin");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser?.name || "Admin");
      } catch {
        setUsername("Admin");
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div>
            <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 font-semibold">
              {username}
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
