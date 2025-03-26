import userAuth from "../../context/AuthContext";
import { useBooking } from "../../context/BookingContext";

const BookingDetail = () => {
   const { bookingData } = useBooking();
  const { session } = userAuth()

  const extraPrices = {
    "Breakfast": 150,
    "Extra pillows": 100,
    "Extra bed": 500,
  };
  
  const extrasTotal = bookingData.extras.reduce((total, extra) => {
    return total + (extraPrices[extra] || 0);
  }, 0);
  
  const totalPrice = bookingData.price + extrasTotal;  
  
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
      </div>
    </div>
  );
};

export default BookingDetail;
