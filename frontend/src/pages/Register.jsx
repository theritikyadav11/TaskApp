import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (form) => {
    const res = await register(form);
    localStorage.setItem("token", res.token);
    if (res.user.role === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
}
