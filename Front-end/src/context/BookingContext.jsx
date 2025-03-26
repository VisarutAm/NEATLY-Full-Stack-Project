import { createContext, useContext, useState } from "react";
import axios from "axios";

// สร้าง Context
const BookingContext = createContext();

// Provider สำหรับหุ้ม Component ทั้งหมดที่ต้องใช้ข้อมูลนี้
export const BookingProvider = ({ children }) => {
  const [sumPrice,setSumprice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [bookingData, setBookingData] = useState({
    roomType: "",
    checkInDate: null,
    checkOutDate: null,
    price: 0,
    guestInfo: {},
    extras: [],   
    finalPrice: 0,
  });

 
   const handleBooking = async () => {
    console.log("Booking data before sending:", bookingData);
    console.log("handleBooking function called");
   
    const bookingInfo = {
      user_name: bookingData.guestInfo?.name || "",
      email: bookingData.guestInfo?.email || "",
      phone: bookingData.guestInfo?.phone || "",
      room_type: bookingData.roomType,
      check_in: bookingData.checkInDate,
      check_out: bookingData.checkOutDate,
      price:sumPrice,
      total_price: finalPrice,
      status: "ชำระเงินแล้ว",
      extras: bookingData.extras || [],
    };
    console.log("Sending booking data:", bookingInfo);

  
    try {
      console.log("Sending POST request...");
      const response = await axios.post(
        "http://localhost:4000/api/submit-booking",
        bookingInfo // ส่งข้อมูล bookingInfo ไปกับคำขอ
      );
      console.log("Booking response:", response.data); // ใช้ response.data
      alert("Booking successful!");
      window.location.href =  `/bookinghistory/${bookingData.guestInfo?.email}`;
    } catch (error) {
      console.error("Error:", error);
      alert("Booking failed!");
    }
  };
  
  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        finalPrice,
        setFinalPrice,
        handleBooking,
        setSumprice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Hook สำหรับใช้ Context ได้ง่ายขึ้น
export const useBooking = () => {
  return useContext(BookingContext);
};
