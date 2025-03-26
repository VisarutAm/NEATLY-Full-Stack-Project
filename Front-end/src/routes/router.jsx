import { createBrowserRouter } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([...PublicRoutes, ...ProtectedRoutes]);
