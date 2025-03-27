import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import DeletePopup from "./DeletePopup";
import { toast } from "react-toastify";

const categoryStyles = {
  Confirmed: {
    backgroundColor: "#66ff66",
    color: "#323640",
  },
  "Checked In": {
    backgroundColor: "#ff6699",
    color: "#323640",
  },
  "Checked Out": {
    backgroundColor: "#3399ff",
    color: "#00596C",
  },
};

const rooms = [
  { image: assets.image_1, type: "Superior Garden View", price: 2500.0 },
  { image: assets.image_2, type: "Deluxe", price: 2500.0 },
  { image: assets.image_3, type: "Superior", price: 2500.0 },
  { image: assets.image_5, type: "Supreme", price: 2500.0 },
  { image: assets.image_4, type: "Premier Sea View", price: 2500.0 },
  { image: assets.image_6, type: "Suite", price: 2500.0 },
];

const extraPrices = {
  Breakfast: 150,
  "Extra pillows": 100,
  "Extra bed": 500,
};

const Card_Admin = () => {
  const [bookingDetails, setBookingDetail] = useState([]);
  const [searchEmail, setSearchEmail] = useState(""); 
  const [showDetail, setShowDetail] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null); 
  const [statusMap, setStatusMap] = useState({});

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/update-status/${id}`,
        { status: newStatus }
      );
      //console.log(response.data);
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api`);
        //console.log(response.data.data);
        setBookingDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchBookingData();
  }, []);

  const ShowExtrasPrice = (extraName) => {
    return extraPrices[extraName] || 0;
  };

  const ShowPrice = (roomType) => {
    const room = rooms.find((room) => room.type === roomType);
    return room ? room.price : "";
  };

  const DisplayImage = (roomType) => {
    const room = rooms.find((room) => room.type === roomType);
    return room ? room.image : "";
  };

  const filteredBookings = bookingDetails.filter(
    (booking) => booking.email.toLowerCase().includes(searchEmail.toLowerCase()) 
  );

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

  const isShow = (index) => {
    setShowDetail(showDetail === index ? null : index); 
  };

  const handleDeleteConfirm = async (id) => {
    //console.log(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete/${id}`);
      setBookingDetail((prev) => prev.filter((item) => item.id !== id));
      setDeleteItem(null);
      toast.success("Delete successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="booking-history ">
      <div className="mb-5 ">
        <input
          type="text"
          placeholder="Search by email..."
          className="border border-gray-400 p-2 rounded-lg w-full"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)} 
        />
      </div>
      <div>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((bookingDetail, index) => (
            <div
              key={index}
              className="booking-history-card mx-20 my-10 bg-base-500 shadow-xl flex flex-row p-10"
            >
              <img
                src={DisplayImage(bookingDetail.room_type)}
                alt="Room Image"
                className="item-1 w-64 h-64 object-cover rounded-lg"
              />
              <div className="flex flex-col item-2 mx-20 w-160">
                <div className=" flex flex-row justify-between">
                  <h3 className="font-inter text-3xl font-bold">
                    {bookingDetail.room_type}
                  </h3>
                  <div className="flex flex-col">
                    <h6 className="font-inter font-normal text-gray-600">
                      Booking date: {formatDate(bookingDetail.created_at)}
                    </h6>
                    <h6 className="font-inter font-normal text-gray-600">
                      {bookingDetail.email}
                    </h6>
                  </div>
                </div>
                <div className="check-in-detail flex flex-row gap-20 py-5">
                  <div>
                    <h3 className="font-medium">Check-in</h3>
                    <h3 className="text-gray-500">
                      {formatDate(bookingDetail.check_in)} || After 2:00 PM
                    </h3>
                  </div>
                  <div>
                    <h3 className="font-medium ">Check-out</h3>
                    <h3 className="text-gray-500">
                      {formatDate(bookingDetail.check_out)} || Before 12:00 PM
                    </h3>
                  </div>
                </div>

                <div className=" rounded-2xl my-5">
                  <div className="flex flex-row justify-between bg-gray-400 p-3 ">
                    <h2 className="font-medium">Booking Detail</h2>
                    <button onClick={() => isShow(index)}>
                      {showDetail === index ? "▼" : "▲"}
                    </button>
                  </div>

                  {showDetail === index && (
                    <div className="px-5 bg-gray-200 rounded-b-2xl ">
                      <div className="flex flex-row justify-between py-5">
                        <h3>2Guests (1 Night)</h3>
                        <select
                          className="border-1 rounded-sm "
                          style={
                            categoryStyles[
                              statusMap[bookingDetail.id] ||
                                bookingDetail.status
                            ] || {}
                          }
                          value={
                            statusMap[bookingDetail.id] || bookingDetail.status
                          }
                          onChange={(e) =>
                            setStatusMap((prev) => ({
                              ...prev,
                              [bookingDetail.id]: e.target.value,
                            }))
                          }
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Checked In">Checked In</option>
                          <option value="Checked Out">
                            Checked Out
                          </option>
                        </select>
                      </div>
                      <div className="flex flex-row justify-between ">
                        <h3 className="font-medium">
                          {bookingDetail.room_type}
                        </h3>
                        <h3 className="font-medium">
                          {ShowPrice(bookingDetail.room_type)}
                        </h3>
                      </div>
                      {bookingDetail.extras?.map((extra, index) => (
                        <div
                          className="flex flex-row justify-between "
                          key={index}
                        >
                          <h3 className="text-gray-500">{extra}</h3>
                          <h3 className="font-medium  px-2 rounded-2xl text-gray-500">
                            {ShowExtrasPrice(extra)}
                          </h3>
                        </div>
                      ))}

                      <div className="flex flex-row justify-between ">
                        <h3 className="font-medium">Discount</h3>
                        <h3 className="font-medium mr-2">
                          -
                          {bookingDetail.total_price != null &&
                          bookingDetail.price != null
                            ? Math.abs(
                                bookingDetail.price - bookingDetail.total_price
                              ).toLocaleString() 
                            : "0"}
                        </h3>
                      </div>
                      <hr className="text-gray-500"></hr>
                      <div className="flex flex-row justify-between py-2">
                        <h3>Total</h3>
                        <h3 className="font-medium">
                          {bookingDetail.total_price}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-20">
                  <button
                    className="bg-red-500 p-2 rounded-2xl text-gray-200 w-17"
                    onClick={() => setDeleteItem(bookingDetail)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 p-2 rounded-2xl text-gray-200 w-17"
                    onClick={() =>
                      handleStatusChange(
                        bookingDetail.id,
                        statusMap[bookingDetail.id]
                      )
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
              <DeletePopup
                isOpen={deleteItem !== null} 
                onClose={() => setDeleteItem(null)} 
                itemToDelete={deleteItem}
                onDeleteConfirm={handleDeleteConfirm}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Card_Admin;
