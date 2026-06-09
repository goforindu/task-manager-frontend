import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTasks } from "../features/tasks/taskThunk";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const { tasks, loading, pagination, stats } = useSelector(
    (state) => state.tasks
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        getTasks({
          page,
          limit: 5,
          search,
          status,
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status, page, dispatch]);
  useEffect(() => {
    setPage(1);
  }, [search, status]);
  const totalTasks = stats?.totalTasks || 0;
  const pendingTasks = stats?.pendingTasks || 0;
  const completedTasks = stats?.completedTasks || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Task Dashboard</h2>

          <p className="text-slate-500 mt-2">
            Manage and track your daily tasks efficiently.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <p className="text-slate-500 text-sm">Total Tasks</p>

            <h3 className="text-4xl font-bold mt-3">{totalTasks}</h3>
          </div>

          <div className="card p-6">
            <p className="text-slate-500 text-sm">Pending Tasks</p>

            <h3 className="text-4xl font-bold mt-3 text-amber-500">
              {pendingTasks}
            </h3>
          </div>

          <div className="card p-6">
            <p className="text-slate-500 text-sm">Completed Tasks</p>

            <h3 className="text-4xl font-bold mt-3 text-green-600">
              {completedTasks}
            </h3>
          </div>
        </div>

        {/* Search / Filter / Create */}
        <div className="card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tasks..."
                className="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="md:w-56">
              <select
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button
              onClick={() => setShowTaskModal(true)}
              className="btn-primary md:w-auto px-6"
            >
              + New Task
            </button>
          </div>
        </div>

        {/* Modal */}
        {showTaskModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card p-6 w-full max-w-lg relative">
              <button
                onClick={() => setShowTaskModal(false)}
                className="absolute top-4 right-4 text-2xl text-slate-500 hover:text-slate-800"
              >
                ×
              </button>

              <TaskForm onClose={() => setShowTaskModal(false)} />
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

              <p className="mt-4 text-slate-500">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="card p-12 text-center">
              <h3 className="text-xl font-semibold mb-2">No Tasks Found</h3>

              <p className="text-slate-500">
                Create your first task to get started.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => setShowTaskModal(true)}
              />
            ))
          )}
        </div>
        {pagination && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-medium">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
