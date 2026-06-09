import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { createTask, updateTask } from "../features/tasks/taskThunk";

import { clearSelectedTask } from "../features/tasks/taskSlice";

const TaskForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const { selectedTask } = useSelector((state) => state.tasks);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedTask) {
      reset({
        title: selectedTask.title,
        description: selectedTask.description,
      });
    } else {
      reset({
        title: "",
        description: "",
      });
    }
  }, [selectedTask, reset]);

  const onSubmit = async (data) => {
    if (selectedTask) {
      const result = await dispatch(
        updateTask({
          id: selectedTask._id,
          data,
        })
      );

      if (updateTask.fulfilled.match(result)) {
        toast.success("Task updated");

        dispatch(clearSelectedTask());

        reset({
          title: "",
          description: "",
        });

        if (onClose) {
          onClose();
        }
      }
    } else {
      const result = await dispatch(createTask(data));

      if (createTask.fulfilled.match(result)) {
        toast.success("Task created");

        reset({
          title: "",
          description: "",
        });

        if (onClose) {
          onClose();
        }
      }
    }
  };

  const handleCancelEdit = () => {
    dispatch(clearSelectedTask());

    reset({
      title: "",
      description: "",
    });

    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        {selectedTask ? "Edit Task" : "Create New Task"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Task title"
            className="input"
            {...register("title", {
              required: "Title is required",
            })}
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            rows="4"
            placeholder="Task description"
            className="input resize-none"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          {selectedTask ? "Update Task" : "Create Task"}
        </button>

        {selectedTask && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="w-full border border-slate-300 py-3 rounded-full hover:bg-slate-50 transition"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
