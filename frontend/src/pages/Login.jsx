import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    localStorage.setItem("token", res.token);
    if (res.user.role === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
