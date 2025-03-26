import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QwzVxAuDK6OfotmVvCJ3HmOvimACW5t2AVdVmeGw9574uwNZVoJjj7oEqyjuUbmJpYLRjMMxMBZX7fKmccY2GpQ00ADfHO9rA");

createRoot(document.getElementById("root")).render(
  <StrictMode>    
      <AuthProvider>
        <BookingProvider>
           <Elements stripe={stripePromise}>
        <RouterProvider router = {router}/>
        </Elements>
        </BookingProvider>
      </AuthProvider>    
  </StrictMode>
);
