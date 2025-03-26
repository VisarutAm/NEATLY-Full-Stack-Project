import { useState } from "react";
import { useBooking } from "../../context/BookingContext";
import { Navigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const rooms = [
  { image: assets.image_1, type: "Superior Garden View", price: 2500.00 },
  { image: assets.image_2, type: "Deluxe", price: 2500.00 },
  { image: assets.image_3, type: "Superior", price: 2500.00 },
  { image: assets.image_5, type: "Supreme", price: 2500.00 },
  { image: assets.image_4, type: "Premier Sea View", price: 2500.00 },
  { image: assets.image_6, type: "Suite", price: 2500.00 },
];

const SelectRoom = () => {
  const { bookingData, setBookingData } = useBooking();
  const [roomType, setRoomType] = useState(bookingData.roomType || "");
  const [checkIn, setCheckIn] = useState(bookingData.checkInDate || "");
  const [checkOut, setCheckOut] = useState(bookingData.checkOutDate || "");
  const [next, setNext] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  
  const handleSearch = () => {
    if (roomType === "") {
      setFilteredRooms(rooms); 
    } else {
      const searchRoom = rooms.filter((room) => room.type === roomType);
      setFilteredRooms(searchRoom);
    }
  };

  const handleDateChange = (e, type) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0]; // วันที่ปัจจุบัน

    if (selectedDate < currentDate) {
      toast.error("คุณไม่สามารถเลือกวันที่ย้อนกลับได้");
    } else {
      if (type === "checkIn") {
        setCheckIn(selectedDate);
      } else {
        setCheckOut(selectedDate);
      }
    }
  };
  
  const handleNext = (selectedRoom) => {
    if (!checkIn || !checkOut) {
      toast.error("Please select dates first.");
      return;
    }
    setBookingData({
      ...bookingData,
      roomType: selectedRoom.type,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      price: selectedRoom.price,
    });
    setNext(true);
  };

  if (next) {
    return <Navigate to="/booking/process" />;
  }

  return (
    <div>
      
      <div className="select-room bg-base-100 shadow-sm  flex flex-row gap-30 py-6 justify-center items-end">
        <div className="check-in flex flex-col items-start ">
          <label className="text-gray-600">Check In</label>
          <input
            className="border-1 rounded-sm border-gray-600 text-gray-600 "
            type="date"
            value={checkIn}
            onChange={(e) => handleDateChange(e, "checkIn")}/>
        </div>
        <div className="check-out flex flex-col items-start">
          <label className="text-gray-600">Check Out</label>
          <input
            className="border-1 rounded-sm border-gray-600 text-gray-600"
            type="date"
            value={checkOut}
            onChange={(e) => handleDateChange(e, "checkOut")}
          />
        </div>
        <div className="room-ype flex flex-col items-start">
          <label className="text-gray-600">Room Type:</label>
          <select
            className="border-1 rounded-sm border-gray-600 text-gray-600"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="Superior Garden View">Superior Garden View</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Superior">Superior</option>
            <option value="Supreme">Supreme</option>
            <option value="Premier Sea View">Premier Sea View</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        <button className="btn-search border-2 px-6 rounded-4xl h-8 border-amber-500 text-amber-500 hover:bg-amber-400"
        onClick={handleSearch}>
          Search
        </button>
      </div>
      {filteredRooms.length > 0 ? (
        <div className="card-detail-rooms ">
          {filteredRooms.map((room, index) => (
            <div key={index} className="room-card mx-20 my-10 bg-base-500 shadow-xl flex flex-row p-10">
              <img src={room.image} alt="Room Image" className="item-1 w-64 h-64 object-cover rounded-lg" />
              <div className="item-2 mx-20 w-160">
                <h3 className="font-inter text-3xl font-bold">{room.type}</h3>
                <h6 className="font-inter font-normal text-gray-600">2 Guests | 1 Double bed | 32 sqm</h6>
                <br/><br/>
                <p className="font-inter font-normal text-gray-600">
                 Rooms (36sqm) with full garden view, 1 siggle bed, bathroom with bathtub & shower.
                </p>
              </div>
              <div className="item-3 flex flex-col justify-between w-80 ">
                <div>
                <p className="line-through font-inter font-normal text-gray-600 text-end">THB 3,100.00</p>
                <p className="font-inter text-xl font-bold text-end">THB {room.price.toFixed(2)}</p>
                <br></br>
                <p className="font-inter font-normal text-gray-600 text-end text-sm">Per Night</p>
                <p className="font-inter font-normal text-gray-600 text-end text-sm">(Including Taxes & Fees)</p>
                </div>
                <button className="btn-booking text-amber-900  bg-amber-500 p-2 rounded-sm" onClick={() => handleNext(room)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>ไม่มีห้องว่างสำหรับประเภทนี้</p>
      )}
    </div>
  );
};

export default SelectRoom;
