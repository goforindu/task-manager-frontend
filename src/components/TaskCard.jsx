import { useDispatch } from "react-redux";
import { setSelectedTask } from "../features/tasks/taskSlice";
import { deleteTask, toggleTaskStatus } from "../features/tasks/taskThunk";
import { toast } from "react-toastify";

const TaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const result = await dispatch(deleteTask(task._id));
    if (deleteTask.fulfilled.match(result)) {
      toast.success("Task deleted");
    }
  };

  const handleToggleStatus = async () => {
    const result = await dispatch(toggleTaskStatus(task._id));

    if (toggleTaskStatus.fulfilled.match(result)) {
      toast.success("Task status updated");
    }
  };

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>

          <p className="text-slate-500 mt-2">{task.description}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="flex gap-3 mt-5">
        <button
          onClick={handleToggleStatus}
          className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm"
        >
          {task.status === "completed" ? "Mark Pending" : "Mark Complete"}
        </button>
        <button
          onClick={() => {
            dispatch(setSelectedTask(task));

            onEdit();
          }}
          className="px-4 py-2 rounded-full bg-slate-800 text-white text-sm"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-full bg-red-500 text-white text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
