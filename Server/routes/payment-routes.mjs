import express from "express";
import Stripe from "stripe";

const payment = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});


payment.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;
  //console.log("Received amount:", amount, "currency:", currency); // ตรวจสอบค่าที่รับมา

  //console.log(req.body)
  
  if (!amount || !currency) {
    return res.status(400).send({ error: "Amount and currency are required" });
  }

  const amountInCents = Math.round(amount);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount:amountInCents, 
      currency,
      payment_method_types: ["card", "promptpay"], // Ensure this matches your payment method
    });
    //console.log("Payment Intent Created:", paymentIntent.id);
    //console.log(paymentIntent)

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("PaymentIntent creation error:", error); // Log error for debugging
    res.status(500).send({
      error: error.message,
    });
  }
});

payment.get("/payment-status/:paymentIntentId", async (req, res) => {
  const { paymentIntentId } = req.params;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.status(200).json({ status: paymentIntent.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  export default payment