// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">TaskFlow</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-900">{user?.name}</p>

              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-primary md:w-auto px-5">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
