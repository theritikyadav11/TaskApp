import axios from "axios";

const BASE_URL = "http://localhost:8000/api/auth";

// export async function login(email, password) {
//   try {
//     const { data } = await axios.post(`${BASE_URL}/login`, { email, password });
//     return data;
//   } catch (error) {
//     // Axios errors can be in response.data.message or error.message
//     throw new Error(error.response?.data?.message || "Login failed");
//   }
// }

// src/services/auth.js, after login
export async function login(email, password) {
  try {
    const { data } = await axios.post(`${BASE_URL}/login`, { email, password });
    // Save token and user info to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // <--- This line stores user info
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

export async function register({ name, email, password, role }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/register`, {
      name,
      email,
      password,
      role,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
}

export async function logout() {
  await axios.post(`${BASE_URL}/logout`);
  localStorage.removeItem("token");
}
