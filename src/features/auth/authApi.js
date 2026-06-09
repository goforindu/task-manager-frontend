import api from "../../services/axios";

export const registerUserApi = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUserApi = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
