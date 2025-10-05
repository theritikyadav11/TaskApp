import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const createUser = async (user) => {
  const res = await api.post("/users", user);
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await api.delete(`/users/${userId}`);
  return res.data;
};

// services/users.js
export const assignTaskToUser = async (userId, taskData) => {
  const res = await api.post(`/users/${userId}/assign`, taskData);
  return res.data;
};

export const getUserDetails = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};
