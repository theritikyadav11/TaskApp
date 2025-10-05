import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 bg-gray-900 text-white shadow-md">
      <Link to="/" className="font-bold text-2xl md:text-3xl">
        TaskApp
      </Link>
      <div className="space-x-3">
        <Link
          to="/login"
          className="px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
