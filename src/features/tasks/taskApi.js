import api from "../../services/axios";

export const getTasksApi = async (params = {}) => {
  const response = await api.get("/tasks", {
    params,
  });

  return response.data;
};

export const createTaskApi = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const updateTaskApi = async ({ id, data }) => {
  const response = await api.patch(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTaskApi = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const toggleTaskStatusApi = async (id) => {
  const response = await api.patch(`/tasks/${id}/status`);
  return response.data;
};
