import Navbar from "../components/Navbar";
import Card_Admin from "../components/Admin/Card_Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // สไตล์ของ toast


const AdminDashboard = () => { 
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Card_Admin/>
    </div>
  );
}

export default AdminDashboard
