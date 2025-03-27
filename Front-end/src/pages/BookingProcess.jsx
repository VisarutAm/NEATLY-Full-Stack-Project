import React from 'react';
import Navbar from '../components/Navbar';
import StepBooking from '../components/Booking/StepBooking';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // สไตล์ของ toast

const BookingProcess = () => {

  const stripePromise = loadStripe(
    "pk_test_51QwzVxAuDK6OfotmVvCJ3HmOvimACW5t2AVdVmeGw9574uwNZVoJjj7oEqyjuUbmJpYLRjMMxMBZX7fKmccY2GpQ00ADfHO9rA"
  );

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Elements stripe={stripePromise}>        
      <StepBooking />
      </Elements>
    </div>
  );
};

export default BookingProcess;
