import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  toggleTaskStatusApi,
} from "./taskApi";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (params = {}, thunkAPI) => {
    try {
      return await getTasksApi(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, thunkAPI) => {
    try {
      return await createTaskApi(taskData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateTaskApi({ id, data });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      await deleteTaskApi(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTaskStatus",
  async (id, thunkAPI) => {
    try {
      return await toggleTaskStatusApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update status"
      );
    }
  }
);
