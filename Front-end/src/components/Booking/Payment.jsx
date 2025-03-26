import React, { useState } from "react";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { useBooking } from "../../context/BookingContext";
import PaymentRadio from "../Booking/PaymentRadio";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ServicePayment = () => {
  const [selected, setSelected] = useState("credit-card");
  const {
    bookingData,
    setBookingData,
    setFinalPrice,
    handleBooking,
    setSumprice,
  } = useBooking();
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const stripe = useStripe();
  const [discountCode, setDiscountCode] = useState(""); // เก็บโค้ดที่ผู้ใช้ป้อน
  const [cardNumber, setCardNumber] = useState(false);

  const extraPrices = {
    Breakfast: 150,
    "Extra pillows": 100,
    "Extra bed": 500,
  };

  const discountCodes = {
    DISCOUNT10: 0.1,
    DISCOUNT20: 0.2,
    DISCOUNT30: 0.3,
  };

  const extrasTotal = bookingData.extras.reduce((total, extra) => {
    return total + (extraPrices[extra] || 0);
  }, 0);

  const totalPrice = bookingData.price + extrasTotal;
  setSumprice(totalPrice);

  const finalPrice = bookingData.finalPrice || totalPrice;
  setFinalPrice(finalPrice);

  const genQR = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/create-payment-intent",
        {
          amount: finalPrice * 100,
          currency: "thb",
        }
      );

      const { clientSecret, paymentIntentId } = response.data;
      console.log("Response:", response.data);

      const result = await stripe.confirmPromptPayPayment(clientSecret, {
        payment_method: {
          promptpay: {},
          billing_details: {
            email: "dummy@example.com",
          },
        },
      });

      if (result.error) {
        console.error("Stripe error:", result.error.message);
      } else {
        checkPaymentStatus(paymentIntentId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkPaymentStatus = async (paymentIntentId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/payment-status/${paymentIntentId}`
      );
      //console.log("responses:", response);
      if (response.data.status === "succeeded") {
        handleBooking();
        toast.success("ชำระเงินสำเร็จ");
      } else {
        setTimeout(() => checkPaymentStatus(paymentIntentId), 5000);
      }
    } catch (error) {
      // console.error("Error checking payment status:", error);
    }
  };

  function handleQR() {
    genQR();
    setSelected("propmt-pay");
  }

  const applyDiscount = () => {
    if (discountCodes[discountCode]) {
      const discountRate = discountCodes[discountCode];
      const newFinalPrice = totalPrice * (1 - discountRate);
      toast.success("โค้ดส่วนลดถูกต้อง!");
      setBookingData({
        ...bookingData,
        discountCode: discountCode,
        discountValue: discountRate,
        finalPrice: newFinalPrice,
      });
    } else {
      setBookingData({
        ...bookingData,
        finalPrice: totalPrice,
      });
    }
  };

  useEffect(() => {
    applyDiscount();
  }, [discountCode]);

  return (
    <div className="payment-background w-full min-h-full">
      <div className="container w-full h-auto bg-white border-solid border-[1px] border-[#CCD0D7] rounded-[8px] flex flex-col p-4 md:px-6 md:pt-6 md:pb-11 gap-4 md:gap-5">
        <div className="radio-tile-group flex gap-4">
          <PaymentRadio
            id="prompt-pay"
            checked={selected === "propmt-pay"}
            onChange={() => handleQR()}
            icon={
              <QrCode2OutlinedIcon
                className={
                  selected === "propmt-pay"
                    ? "text-[#336DF2]"
                    : "text-[#B3B8C4] group-hover:text-[#336DF2]"
                }
                sx={{ fontSize: isMdUp ? "35px" : "28px" }}
              />
            }
            label="พร้อมเพย์"
          />

          <PaymentRadio
            id="credit-card"
            checked={selected === "credit-card"}
            onChange={() => setSelected("credit-card")}
            icon={
              <PaymentOutlinedIcon
                className={
                  selected === "credit-card"
                    ? "text-[#336DF2]"
                    : "text-[#B3B8C4] group-hover:text-[#336DF2]"
                }
                sx={{ fontSize: isMdUp ? "35px" : "28px" }}
              />
            }
            label="บัตรเครดิต"
          />
        </div>
        {selected === "credit-card" && (
          <form className="flex flex-col gap-6">
            <label className="font-[500] text-[16px] text-[#323640]">
              หมายเลขบัตรเครดิต
              <span className="text-red-600">*</span>
              <CardNumberElement
                id="card-number"
                className="font-prompt w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] pt-[11px] pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:font-prompt placeholder:text-[#646C80]"
                onChange={(e) => {
                  setCardNumber(e.complete);
                }}
              />
            </label>           
            <div className="flex flex-col gap-6 md:flex-row">
              <label className="font-[500] text-[16px] text-[#323640] md:basis-1/2">
                วันหมดอายุ
                <span className="text-red-600">*</span>
                <CardExpiryElement
                  id="card-expiry"
                  className="font-prompt w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] pt-[11px] pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:font-prompt placeholder:text-[#646C80]"
                  onChange={(e) => {
                    setCardExpiry(e.complete);
                  }}
                />
              </label>

              <label className="font-[500] text-[16px] text-[#323640] md:basis-1/2">
                CVC / CVV
                <span className="text-red-600">*</span>
                <CardCvcElement
                  id="card-cvc"
                  className="font-prompt w-full h-[44px] mt-1 border border-solid border-[#CCD0D7] rounded-[8px] pt-[11px] pl-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:font-prompt placeholder:text-[#646C80]"
                  onChange={(e) => {
                    setCardCVC(e.complete);
                  }}
                />
              </label>
            </div>
          </form>
        )}      

        <label className="font-[500] text-[16px] text-[#323640]">
          Promotion Code
          <div className="flex gap-4 h-[64px] mt-1 md:h-[44px]">
            <input
              className="w-full h-full border border-solid border-[#CCD0D7] focus:border-[#336DF2] rounded-[8px] pb-6 md:py-0 px-4 text-[#232630] placeholder:font-[400] placeholder:text-[16px] placeholder:focus:text-[#232630] placeholder:text-[#646C80] placeholder:text-wrap basis-2/3 md:basis-1/2 flex items-center"
              type="text"
              placeholder="กรุณากรอกโค้ดส่วนลด (ถ้ามี)"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            />
            <div className="basis-1/3 md:basis-1/2 flex items-center">
              <button
                className="bg-green-700 max-w-[90px] w-full h-[44px] rounded-lg text-white cursor-pointer"
                onClick={applyDiscount}
              >
                ใช้โค้ด
              </button>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ServicePayment;
