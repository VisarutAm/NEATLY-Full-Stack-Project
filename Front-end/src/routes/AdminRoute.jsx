import { Navigate, Outlet } from "react-router-dom";
import  userAuth  from "../context/AuthContext";

const AdminRoute = () => {
  const { session } = userAuth();

  // ตรวจสอบว่ามี session หรือ token ใน localStorage หรือไม่
  if (session === null) {
    return <div>Loading...</div>;  // แสดงข้อความ Loading หากยังไม่ได้รับ session หรือ token
  }

  return session.user.email === "admin@admin.com" ? <Outlet/> : <Navigate to="/" replace/>;  // หากมี session ให้แสดง children, ถ้าไม่มีก็ไปที่หน้า login
};

export default AdminRoute;
