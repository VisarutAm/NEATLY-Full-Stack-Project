import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import AdminRoute  from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";

export const router = createBrowserRouter ([
  {path:"/", element:<App/>},
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
},
]) 
