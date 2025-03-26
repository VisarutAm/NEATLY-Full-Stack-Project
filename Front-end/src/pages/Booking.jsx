import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // สไตล์ของ toast
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SelectRoom from "../components/Booking/SelectRoom";


const Booking = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <SelectRoom />
      <Footer />
    </div>
  );
};

export default Booking;
