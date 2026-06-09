const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

      <p className="mt-4 text-slate-500">Loading tasks...</p>
    </div>
  );
};

export default Spinner;
