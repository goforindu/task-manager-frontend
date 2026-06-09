import { createSlice } from "@reduxjs/toolkit";

import {
  getTasks,
  createTask,
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "./taskThunk";

const initialState = {
  tasks: [],
  pagination: null,
  stats: null,
  selectedTask: null,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Get Tasks
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;

        state.tasks = action.payload.data.tasks;
        state.pagination = action.payload.data.pagination;
        state.stats = action.payload.data.stats;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTask = state.tasks.find(
          (task) => task._id === action.payload
        );

        state.tasks = state.tasks.filter((task) => task._id !== action.payload);

        if (state.stats && deletedTask) {
          state.stats.totalTasks -= 1;

          if (deletedTask.status === "pending") {
            state.stats.pendingTasks -= 1;
          } else {
            state.stats.completedTasks -= 1;
          }
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload.data;

        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
      })
      // Toggle Task Status
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload.data;

        const oldTask = state.tasks.find(
          (task) => task._id === updatedTask._id
        );

        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );

        if (state.stats && oldTask) {
          if (
            oldTask.status === "pending" &&
            updatedTask.status === "completed"
          ) {
            state.stats.pendingTasks -= 1;
            state.stats.completedTasks += 1;
          } else if (
            oldTask.status === "completed" &&
            updatedTask.status === "pending"
          ) {
            state.stats.pendingTasks += 1;
            state.stats.completedTasks -= 1;
          }
        }
      });
  },
});
export const { setSelectedTask, clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
