// import { useState } from "react";
// import { assets } from "../../assets/assets";
// import { useBooking } from "../../context/BookingContext";

// const BookingDetail = () => {
//   const { bookingData, setBookingData } = useBooking();
//   const Sumprice = bookingData.price + bookingData.extras.length * 200; // ปรับค่าตามที่ต้องการ

//   // อัปเดต Guest Info ทันทีที่พิมพ์
//   const handleGuestInfoChange = (e) => {
//     setBookingData((prev) => ({
//       ...prev,
//       guestInfo: { ...prev.guestInfo, [e.target.name]: e.target.value },
//     }));
//   };

//   // อัปเดต Extras ทันทีที่เลือก Checkbox
//   const handleExtrasChange = (e) => {
//     const { value, checked } = e.target;
//     setBookingData((prev) => ({
//       ...prev,
//       extras: checked
//         ? [...prev.extras, value] // เพิ่ม option ถ้าติ๊ก
//         : prev.extras.filter((extra) => extra !== value), // ลบออกถ้าเอาติ๊กออก
//     }));
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return ""; // กรณีค่าว่าง
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       weekday: "short", // Sun, Mon, Tue, etc.
//       day: "2-digit", // 16
//       month: "short", // May
//       year: "numeric", // 2025
//     });
//   };

//   return (
//     <div className="booking-detail flex flex-col">
//       <p className="bg-green-800">
//         <img src={assets.notebook} />
//         Booking Detail{" "}
//       </p>
//       <div className="container-detail flex flex-col">
//         <div className="time">
//           <div>
//             <p>Check-in</p>
//             <p>After 2:00 PM</p>
//           </div>
//           <div>
//             <p>Check-out</p>
//             <p>Before 12:00 PM</p>
//           </div>
//         </div>
//         <div>
//           <p>Check In: {formatDate(bookingData.checkInDate)}</p>
//           <p>Check Out: {formatDate(bookingData.checkOutDate)}</p>
//           <p>2 Guests</p>
//         </div>
//         <br></br>
//         <span>{bookingData.roomType}</span>
//         <span>{bookingData.price}</span>
//         <p>
//           ตัวเลือกเสริม:{" "}
//           {bookingData.extras.length > 0
//             ? bookingData.extras.map((selectExtra, index) => (
//                 <div key={index}>{selectExtra}</div><div>{priceExtra}</div>
//               ))
//             : "ไม่มี"}
//         </p>
//         <hr />
//         <span>Total</span>
//         <span>THB {Sumprice}</span>
//         <h3>รายละเอียดการจอง</h3>
//         <p>ห้อง: {bookingData.roomType}</p>
//         <p>วันที่เข้าพัก: {bookingData.checkInDate}</p>
//         <p>วันที่ออก: {bookingData.checkOutDate}</p>
//         <p>ราคาทั้งหมด: {bookingData.price} บาท</p>
//         <p>ชื่อผู้จอง: {bookingData.guestInfo.name}</p>
//         <p>เบอร์โทร: {bookingData.guestInfo.phone}</p>
//         <p>อีเมล: {bookingData.guestInfo.email}</p>
//         <p>
//           ตัวเลือกเสริม:{" "}
//           {bookingData.extras.length > 0
//             ? bookingData.extras.join(", ")
//             : "ไม่มี"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default BookingDetail;

// import { useState } from "react";
import userAuth from "../../context/AuthContext";
import { useBooking } from "../../context/BookingContext";

const BookingDetail = () => {
  // const [discountCode, setDiscountCode] = useState(""); // เก็บโค้ดที่ผู้ใช้ป้อน
  // const [discountValue, setDiscountValue] = useState(0); // เก็บค่าส่วนลด
  const { bookingData } = useBooking();
  const { session } = userAuth()

  const extraPrices = {
    "Breakfast": 150,
    "Extra pillows": 100,
    "Extra bed": 500,
  };

  // const discountCodes = {
  //   DISCOUNT10: 0.1, // ลด 10%
  //   DISCOUNT20: 0.2, // ลด 20%
  //   DISCOUNT30: 0.3, // ลด 30%
  // };

  //   const Sumprice =
  //     bookingData.price +
  //     bookingData.extras.reduce((total, extra) => {
  //       return total + (extraPrices[extra] || 0);
  //     }, 0);

  // คำนวณราคารวมของตัวเลือกเสริม
  const extrasTotal = bookingData.extras.reduce((total, extra) => {
    return total + (extraPrices[extra] || 0);
  }, 0);

  // คำนวณราคารวมก่อนหักส่วนลด
  const totalPrice = bookingData.price + extrasTotal;

  // // ฟังก์ชันใช้โค้ดส่วนลด
  // const applyDiscount = () => {
  //   if (discountCodes[discountCode]) {
  //     setDiscountValue(discountCodes[discountCode]); // ตั้งค่าค่าส่วนลด
  //   } else {
  //     setDiscountValue(0); // ถ้าโค้ดไม่ถูกต้อง ไม่ลดราคา
  //     alert("โค้ดส่วนลดไม่ถูกต้อง!");
  //   }
  // };

const sum_price = totalPrice

  // คำนวณราคาสุทธิหลังจากหักส่วนลด
  const finalPrice = bookingData.finalPrice || totalPrice;


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  

  return (
    <div className="booking-detail flex flex-col w-120">
      <p className="bg-green-800 text-white p-2 rounded-t-2xl text-center"> Booking Detail 📝</p>
      <div className="container-detail flex flex-col rounded-b-2xl text-green-300 border-2 border-black/50 p-2 bg-green-600">
        <div className="user-info flex flex-col">
          <div className="flex flex-row justify-between">
          <div className="flex flex-col">
          <strong>Name:</strong>
          <p>{bookingData.guestInfo.name}</p>
          </div>
          <div className="flex flex-col">
            <strong>Tel:</strong>
          <p>{bookingData.guestInfo.phone}</p>
          </div>
          </div>
          <strong>Email: </strong><span>{session.user.email}</span>
        </div>
        <br></br>
        <div className="time flex flex-row justify-between">
          <div>
            <p className="font-medium font text-base ">Check-in</p>
            <p className="text-base ">After 2:00 PM</p>
          </div>
          <div>
            <p className="font-medium font text-base ">Check-out</p>
            <p className="text-base ">Before 12:00 PM</p>
          </div>
        </div>
        <br></br>
        <div>
          <p>
            {formatDate(bookingData.checkInDate)} -{" "}
            {formatDate(bookingData.checkOutDate)}
          </p>
          <p>2 Guests</p>
        </div>
        <br />
        <div className="flex flex-row justify-between">
          <p>{bookingData.roomType}</p>
          <p>{bookingData.price} THB</p>
        </div>
        <div>
          {bookingData.extras.length > 0
            ? bookingData.extras.map((selectExtra, index) => (
                <div key={index}>
                  {selectExtra} - {extraPrices[selectExtra] || 0} THB
                </div>
              ))
            : ""}
        </div>
        <hr />
        <div className="flex flex-row justify-between">
          <span>Total</span>
          <strong>THB {finalPrice.toFixed(2)} </strong>
        </div>

        {/* ส่วนโค้ดส่วนลด */}
        {/* <div className="discount-section ">
          <input
            className="border-2 rounded-sm mr-5"
            type="text"
            placeholder="กรอกโค้ดส่วนลด"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
          />
          <button
            className="font-bold border-2 rounded-2xl px-2 text-white hover:bg-green-700"
            onClick={applyDiscount}
          >
            Code
          </button>
        </div> */}

        {/* {discountValue > 0 && (
          <p>
            ส่วนลด: <strong>{(discountValue * 100).toFixed(0)}%</strong>
          </p>
        )}

        <span>Total After Discount</span>
        <span>
          <strong>THB {finalPrice.toFixed(2)}</strong>
        </span> */}
      </div>
    </div>
  );
};

export default BookingDetail;
