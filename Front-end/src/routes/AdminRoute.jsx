import { Navigate } from "react-router-dom";
import  userAuth  from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { session } = userAuth();

  // ตรวจสอบว่ามี session หรือ token ใน localStorage หรือไม่
  if (session === null) {
    return <div>Loading...</div>;  // แสดงข้อความ Loading หากยังไม่ได้รับ session หรือ token
  }

  return session.user.email === "admin@admin.com" ? <>{children}</> : <Navigate to="/" />;  // หากมี session ให้แสดง children, ถ้าไม่มีก็ไปที่หน้า login
};

export default AdminRoute;
