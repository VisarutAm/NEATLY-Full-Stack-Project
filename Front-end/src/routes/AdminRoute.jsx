import { Navigate, Outlet } from "react-router-dom";
import userAuth from "../context/AuthContext";

const AdminRoute = () => {
  const { session } = userAuth();
  if (session === null) {
    return <div>Loading...</div>;
  }

  return session.user.email === "admin@admin.com" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;
