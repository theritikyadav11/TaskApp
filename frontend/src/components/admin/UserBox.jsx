// components/admin/UserBox.jsx
export default function UserBox({ user, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition"
    >
      <h3 className="text-xl font-bold">{user.name}</h3>
      <p>Tasks: {user.totalTasks}</p>
    </div>
  );
}
