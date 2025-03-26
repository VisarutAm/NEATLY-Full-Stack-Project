// import { useBooking } from "../context/BookingContext";
// import { useState } from "react";
// import BookingDetail from "../components/Booking/BookingDetail";

// const BookingProcess = () => {
//   const { bookingData, setBookingData } = useBooking();
//   const [step, setStep] = useState(1);

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

//   return (
//     <div>
//       <h2>ขั้นตอนที่ {step}</h2>

//       {/* ✅ STEP 1: กรอกข้อมูลผู้เข้าพัก (แสดงผล Real-Time) */}
//       {step === 1 && (
//         <div>
//           <input
//             type="text"
//             name="name"
//             placeholder="ชื่อ"
//             value={bookingData.guestInfo.name}
//             onChange={handleGuestInfoChange}
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="เบอร์โทร"
//             value={bookingData.guestInfo.phone}
//             onChange={handleGuestInfoChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="อีเมล"
//             value={bookingData.guestInfo.email}
//             onChange={handleGuestInfoChange}
//           />

//           {/* ✅ แสดงผลแบบเรียลไทม์ */}
//           <h3>ข้อมูลที่กรอก:</h3>
//           <p>ชื่อ: {bookingData.guestInfo.name}</p>
//           <p>เบอร์โทร: {bookingData.guestInfo.phone}</p>
//           <p>อีเมล: {bookingData.guestInfo.email}</p>
//           <h3>รายละเอียดการจอง</h3>
//           <p>ห้อง: {bookingData.roomType}</p>
//           <p>วันที่เข้าพัก: {bookingData.checkInDate}</p>
//           <p>วันที่ออก: {bookingData.checkOutDate}</p>
//           <p>ราคาทั้งหมด: {bookingData.price} บาท</p>
//           <p>ชื่อผู้จอง: {bookingData.guestInfo.name}</p>
//           <p>เบอร์โทร: {bookingData.guestInfo.phone}</p>
//           <p>อีเมล: {bookingData.guestInfo.email}</p>
//           <p>ตัวเลือกเสริม: {bookingData.extras.length > 0 ? bookingData.extras.join(", ") : "ไม่มี"}</p>
//         </div>
//       )}

//       {/* ✅ STEP 2: เลือกตัวเลือกเสริม (แสดงผล Real-Time) */}
//       {step === 2 && (
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               value="อาหารเช้า"
//               checked={bookingData.extras.includes("อาหารเช้า")}
//               onChange={handleExtrasChange}
//             />
//             อาหารเช้า
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="รถรับส่งสนามบิน"
//               checked={bookingData.extras.includes("รถรับส่งสนามบิน")}
//               onChange={handleExtrasChange}
//             />
//             รถรับส่งสนามบิน
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="เตียงเสริม"
//               checked={bookingData.extras.includes("เตียงเสริม")}
//               onChange={handleExtrasChange}
//             />
//             เตียงเสริม
//           </label>

//           {/* ✅ แสดงผลแบบเรียลไทม์ */}
//           <h3>ข้อมูลที่กรอก:</h3>
//           <p>ชื่อ: {bookingData.guestInfo.name}</p>
//           <p>เบอร์โทร: {bookingData.guestInfo.phone}</p>
//           <p>อีเมล: {bookingData.guestInfo.email}</p>
//           <h3>ตัวเลือกเสริมที่เลือก:</h3>
//           <p>{bookingData.extras.length > 0 ? bookingData.extras.join(", ") : "ไม่มีตัวเลือกเสริม"}</p>

//         </div>
//       )}

//       {/* ✅ STEP 3: แสดงข้อมูลทั้งหมดแบบ Real-Time */}
//       {step === 3 && (
//         <div>
//           <h3>รายละเอียดการจอง</h3>
//           <p>ห้อง: {bookingData.roomType}</p>
//           <p>วันที่เข้าพัก: {bookingData.checkInDate}</p>
//           <p>วันที่ออก: {bookingData.checkOutDate}</p>
//           <p>ราคาทั้งหมด: {bookingData.price} บาท</p>
//           <p>ชื่อผู้จอง: {bookingData.guestInfo.name}</p>
//           <p>เบอร์โทร: {bookingData.guestInfo.phone}</p>
//           <p>อีเมล: {bookingData.guestInfo.email}</p>
//           <p>ตัวเลือกเสริม: {bookingData.extras.length > 0 ? bookingData.extras.join(", ") : "ไม่มี"}</p>
//           <button>ชำระเงิน</button>
//         </div>
//       )}

//       {/* ✅ ปุ่มถัดไป */}
//       {step < 3 && <button onClick={() => setStep((prev) => prev + 1)}>ถัดไป</button>}
//     </div>
//   );
// };

// export default BookingProcess;

// import { useBooking } from "../context/BookingContext";
// import { useState, useEffect } from "react";
// import BookingDetail from "../components/Booking/BookingDetail";

// const BookingProcess = () => {
//   const { bookingData = { guestInfo: {}, extras: [], roomType: "", price: 0 }, setBookingData } = useBooking();
//   const [step, setStep] = useState(1);

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
//         ? [...prev.extras, value]
//         : prev.extras.filter((extra) => extra !== value),
//     }));
//   };

//   return (
//     <div className="flex flex-row bg-amber-500 justify-center gap-20 ">
//     <div className="bg-gray-300">
//       <h2>ขั้นตอนที่ {step}</h2>

//       {step === 1 && (
//         <div>
//           <input
//             type="text"
//             name="name"
//             placeholder="ชื่อ"
//             value={bookingData.guestInfo?.name || ""}
//             onChange={handleGuestInfoChange}
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="เบอร์โทร"
//             value={bookingData.guestInfo?.phone || ""}
//             onChange={handleGuestInfoChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="อีเมล"
//             value={bookingData.guestInfo?.email || ""}
//             onChange={handleGuestInfoChange}
//           />

//         </div>
//       )}

//       {step === 2 && (
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               value="อาหารเช้า"
//               checked={bookingData.extras.includes("อาหารเช้า")}
//               onChange={handleExtrasChange}
//             />
//             อาหารเช้า
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="รถรับส่งสนามบิน"
//               checked={bookingData.extras.includes("รถรับส่งสนามบิน")}
//               onChange={handleExtrasChange}
//             />
//             รถรับส่งสนามบิน
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               value="เตียงเสริม"
//               checked={bookingData.extras.includes("เตียงเสริม")}
//               onChange={handleExtrasChange}
//             />
//             เตียงเสริม
//           </label>

//         </div>
//       )}

//       {step === 3 && (
//         <div>

//           <button>ชำระเงิน</button>
//         </div>
//       )}

//       {step > 1 && <button onClick={() => setStep((prev) => prev - 1)}>ย้อนกลับ</button>}
//       {step < 3 && <button onClick={() => setStep((prev) => prev + 1)}>ถัดไป</button>}
//     </div>
//     <BookingDetail/>
//     </div>
//   );
// };

// export default BookingProcess;

import { useBooking } from "../../context/BookingContext";
import { useState,useEffect } from "react";
import BookingDetail from "./BookingDetail";
import { useNavigate } from "react-router-dom";
import userAuth from "../../context/AuthContext";
import axios from "axios";
import ServicePayment from "./Payment";
import { toast } from "react-toastify";
import {
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const BookingProcess = () => {
  const {
    bookingData = { guestInfo: {}, extras: [], roomType: "", price: 0 },
    setBookingData,
    finalPrice,
    handleBooking,
  } = useBooking();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { session } = userAuth();
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  // อัปเดต Guest Info ทันทีที่พิมพ์
  const handleGuestInfoChange = (e) => {
    setBookingData((prev) => ({
      ...prev,
      guestInfo: { ...prev.guestInfo, [e.target.name]: e.target.value },
    }));
  };

  // อัปเดต Extras ทันทีที่เลือก Checkbox
  const handleExtrasChange = (e) => {
    const { value, checked } = e.target;
    setBookingData((prev) => ({
      ...prev,
      extras: checked
        ? [...prev.extras, value]
        : prev.extras.filter((extra) => extra !== value),
    }));
  };

  // ฟังก์ชันคืนค่าสี และข้อความของขั้นตอน
  const getStepDetails = () => {
    switch (step) {
      case 1:
        return {
          text: "text-white",
          color: "bg-amber-600",
          text2: "text-gray-600",
          color2: "bg-gray-200",
          colorText: "text-amber-600",
          colorText2: "text-gray-600",
        };

      case 2:
        return {
          text: "text-gray-600",
          color: "bg-gray-200",
          text2: "text-white",
          color2: "bg-amber-600",
          colorText2: "text-amber-600",
          colorText: "text-gray-600",
        };

      default:
        return {
          text: "",
          color: "bg-gray-300",
          text2: "",
          color2: "bg-gray-300",
        };
    }
  };

  const { text, color, text2, color2, colorText, colorText2 } =
    getStepDetails();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit called!");

    setLoading(true);
    console.log("check123", stripe, elements);

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      // Create Payment Intent on the server
      console.log("Final Price:", finalPrice);
      const response = await axios.post(
        "http://localhost:4000/api/create-payment-intent",
        {
          amount: finalPrice * 100, //
          currency: "thb",
        }
      );
      console.log("Final Price:", finalPrice);
      console.log("Booking Data:", bookingData);
      const { clientSecret } = response.data;

      // Confirm the payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {},
        },
      });
      console.log(result);
      if (result.error) {
        alert(`Payment failed: ${result.error.message}. Please try again.`);
        setLoading(false);
      } else {
        //--------Payment with Stripe is Succeeded-----/////
        if (result.paymentIntent.status === "succeeded") {
          //------Format Data According to Database----/////
          await new Promise((resolve) => setTimeout(resolve, 0));

          // storeBillInfo();
          handleBooking();
          toast.success("ชำระเงินสำเร็จ");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.user.email) {
      setBookingData((prevData) => ({
        ...prevData,
        guestInfo: {
          ...prevData.guestInfo,
          email: session.user.email,
        },
      }));
    }
  }, [session.user.email]); 
  
// ตรวจสอบค่าก่อนให้กด "ถัดไป"
useEffect(() => {
  setIsValid(
    bookingData.guestInfo?.name?.trim() !== "" &&
    bookingData.guestInfo?.phone?.trim() !== ""
  );
}, [bookingData.guestInfo?.name, bookingData.guestInfo?.phone]);

const handleNext = () => {
  // เช็คถ้าผู้ใช้ไม่ได้กรอกข้อมูลสำคัญ เช่น name หรือ phone
  if (!bookingData.guestInfo.name || !bookingData.guestInfo.phone) {
    // แสดง Toast เตือน
    toast.error("Please fill in all required fields before proceeding.");
    return; // หยุดการทำงานของฟังก์ชันนี้
  }

  // ถ้าข้อมูลครบแล้ว กดปุ่มถัดไป
  setStep((prev) => prev + 1);
};

  return (
    <div className="booking-room  mx-25 ">
      <h1 className="font-medium font-noto text-6xl text-green-800">
        Booking Room
      </h1>

      <div className="step flex flex-row my-5 justify-evenly ">
        <div className="flex flex-row ">
          <h2
            className={`${color} px-5 py-2  ${text} font-bold text-3xl text-center
       `}
          >
            1
          </h2>
          <p className={`px-5 py-3 ${colorText} font-bold`}>Information</p>
        </div>
        <div className="flex flex-row">
          <h2
            className={`${color2} px-5 py-2  ${text2} font-bold text-3xl text-center
       `}
          >
            2
          </h2>
          <p className={`px-5 py-3 ${colorText2} font-bold`}>Payment Method</p>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-20">
        <div className="p-5 rounded-lg shadow-2xl border-1 w-full">
          {/* แสดงขั้นตอนพร้อมสีพื้นหลัง */}

          {step === 1 && (
            <div>
              <h2 className=" text-lg font-medium p-2  text-gray-800">
                Information
              </h2>
              <div className="flex flex-row gap-3 mt-3">
                <input
                  type="text"
                  name="name"
                  placeholder="ชื่อ"
                  value={"" || bookingData.guestInfo?.name}
                  onChange={handleGuestInfoChange}
                  className="p-2 border rounded-md"
                  
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Tel"
                  value={bookingData.guestInfo?.phone || ""}
                  onChange={handleGuestInfoChange}
                  className="p-2 border rounded-md"
                  
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={session.user.email || ""}
                  onChange={handleGuestInfoChange}
                  className="p-2 border rounded-md cursor-not-allowed"
                  readOnly
                />
              </div>
              <div className="pt-5">
                <p className="font-bold text-gray-800">Special Request</p>
                <p className=" text-gray-600 font-medium">
                  Additional charge may apply
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label>
                  <input
                    type="checkbox"
                    value="Breakfast"
                    checked={bookingData.extras.includes("Breakfast")}
                    onChange={handleExtrasChange}
                  />
                  Breakfast (+150)
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Extra bed"
                    checked={bookingData.extras.includes("Extra bed")}
                    onChange={handleExtrasChange}
                  />
                  Extra bed(+THB 500)
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Extra pillows"
                    checked={bookingData.extras.includes("Extra pillows")}
                    onChange={handleExtrasChange}
                  />
                  Extra pillows (+THB 100)
                </label>
              </div>
            </div>
          )}

          {/* {Object.keys(extraPrices).map((extra) => (
  <label key={extra}>
    <input
      type="checkbox"
      value={extra}
      checked={bookingData.extras.includes(extra)}
      onChange={handleExtrasChange}
    />
    {extra} (+THB {extraPrices[extra]})
  </label>
))}
 */}

          {/* {step === 2 && (
          <div className="flex flex-col gap-2 mt-3">
            <label>
              <input
                type="checkbox"
                value="อาหารเช้า"
                checked={bookingData.extras.includes("อาหารเช้า")}
                onChange={handleExtrasChange}
              />
              อาหารเช้า
            </label>
            <label>
              <input
                type="checkbox"
                value="รถรับส่งสนามบิน"
                checked={bookingData.extras.includes("รถรับส่งสนามบิน")}
                onChange={handleExtrasChange}
              />
              รถรับส่งสนามบิน
            </label>
            <label>
              <input
                type="checkbox"
                value="เตียงเสริม"
                checked={bookingData.extras.includes("เตียงเสริม")}
                onChange={handleExtrasChange}
              />
              เตียงเสริม
            </label>
          </div>
        )} */}

          {/* {step === 3 && (
          <div className="mt-3">
            <button className="bg-blue-500 text-white p-2 rounded-md">ชำระเงิน</button>
          </div>
        )} */}

          {step === 2 && (
            <div>
              <ServicePayment />
            </div>
          )}

          {/* ปุ่มย้อนกลับ & ถัดไป */}
          <div className="flex gap-3 mt-5 justify-evenly ">
            {step === 1 && (
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md mt-15"
                onClick={() => navigate("/booking")}
              >
                ย้อนกลับ
              </button>
            )}
            {step > 1 && (
              <div>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md "
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  ย้อนกลับ
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md mt-15"
                  onClick={handleSubmit}
                  disabled={loading} // ปิดปุ่มขณะโหลด
                >
                  {loading ? "Wait..." : "ชำระเงิน"}
                </button>
              </div>
            )}
            {step < 2 && (
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md mt-15"
                // onClick={() => setStep((prev) => prev + 1)}
                onClick={handleNext}
                disabled={!isValid} // ถ้าข้อมูลไม่ครบ ปุ่มจะถูก disable
              >
                ถัดไป
              </button>
            )}
          </div>
        </div>

        <BookingDetail />
      </div>
    </div>
  );
};

export default BookingProcess;
