import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    try {
      await onRegister(form);
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <form
      className="bg-white shadow rounded p-6 space-y-4 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring
            ${error ? "border-red-500" : "border-gray-300"}`}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring
            ${error ? "border-red-500" : "border-gray-300"}`}
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring
            ${error ? "border-red-500" : "border-gray-300"}`}
        placeholder="Password"
        required
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring border-gray-300"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
        Register
      </button>

      <p className="mt-6 text-center text-gray-700">
        Already have Registered?{" "}
        <Link
          to="/login"
          className="text-indigo-600 hover:underline font-semibold"
        >
          Login here
        </Link>
      </p>
    </form>
  );
}
