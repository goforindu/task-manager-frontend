import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { getCurrentUser } from "./features/auth/authThunk";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token]);

  return (
    <>
      <AppRoutes />

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
