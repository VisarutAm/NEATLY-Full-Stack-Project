import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import axios from "axios";

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

const Card_User = () => {
  const [bookingDetails, setBookingDetail] = useState([]);
  const { email } = useParams();
  const [showDetail, setShowDetail] = useState(null);

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

  useEffect(() => {
    if (!email) return;

    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/${email}`);
        //console.log(response.data.data);
        setBookingDetail(response.data.data);
      } catch (error) {
        //console.error("Error fetching services:", error);
      }
    };
    fetchBookingData();
  }, [email]);
  //console.log("bookingdatail", bookingDetails);

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

  return (
    <div>
      <div className="booking-history ">
        {bookingDetails.map((bookingDetail, index) => (
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
                <h6 className="font-inter font-normal text-gray-600">
                  Booking date: {formatDate(bookingDetail.created_at)}
                </h6>
              </div>
              <div className="check-in-detail flex flex-row gap-20">
                <div>
                  <h3 className="font-medium">Check-in</h3>
                  <h3>{formatDate(bookingDetail.check_in)}</h3>
                </div>
                <div>
                  <h3 className="font-medium">Check-out</h3>
                  <h3>{formatDate(bookingDetail.check_out)}</h3>
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
                      <h3 className="bg-green-400 text-green-800 px-2 rounded-2xl">
                        {bookingDetail.status}
                      </h3>
                    </div>
                    <div className="flex flex-row justify-between ">
                      <h3 className="font-medium">{bookingDetail.room_type}</h3>
                      <h3 className="font-medium">
                        {ShowPrice(bookingDetail.room_type)}
                      </h3>
                    </div>
                    {bookingDetail.extras.map((extra, index) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card_User;
