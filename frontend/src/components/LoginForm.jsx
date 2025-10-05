import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <form
      className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Login
      </h2>
      <input
        type="email"
        className={`w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-indigo-300"
          }`}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className={`w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-indigo-300"
          }`}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}

      <button
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
        type="submit"
      >
        Login
      </button>

      <p className="mt-6 text-center text-gray-700">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-indigo-600 hover:underline font-semibold"
        >
          Register here
        </Link>
      </p>
    </form>
  );
}
