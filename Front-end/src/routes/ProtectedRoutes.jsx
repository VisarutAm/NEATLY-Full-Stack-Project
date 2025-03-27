import AdminDashboard from "../pages/AdminDashboard";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import BookingProcess from "../pages/BookingProcess";
import Booking from "../pages/Booking";
import BookingHistory from "../pages/BookingHistory";


const ProtectedRoutes = [
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { path: "/booking", element: <Booking /> },
      { path: "/booking/process", element: <BookingProcess /> },
      { path: "/bookinghistory/:email", element: <BookingHistory /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [{ path: "/admin", element: <AdminDashboard /> },
         ],
  },
];

export default ProtectedRoutes;
