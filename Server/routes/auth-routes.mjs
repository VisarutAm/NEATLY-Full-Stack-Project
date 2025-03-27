import express from "express";
import { supabase } from "../utils/supabase-client.mjs";
import { validationAuth } from "../middlewares/auth-validation.mjs";

const auth = express.Router();

//Sign Up
auth.post("/signup", async (req, res) => {

    console.log("Request Body:", req.body);
// console.log("Signup Response:", data);

    try {
      const { email, password, displayName } = req.body;  
      
      if (!email || !password || !displayName) {
        return res.status(400).json({ success: false, error: "Please fill in all required fields." });
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { displayName },
         
        },
      });
        
      if (error) {
        console.error("Signup Error:", error.message);
        return res.status(400).json({ success: false, error: error.message });
      }
      
      console.log("Signup Success - Sending response:", { success: true, data }); 
      res.status(201).json({ success: true, data });
    } catch (err) {
      console.error("Server Error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

// Sign in 
auth.post("/login", async (req, res) => { 
  const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  
  const { data: userData, error: userError } = await supabase.auth.getUser(data.session.access_token);

  if (userError) {
    return res.status(400).json({ error: userError.message });
  }
  res.status(200).json({
    success: true,
    message: "Login successful",
    user: userData.user, 
    session: data.session,
  });
});

auth.get("/user", [validationAuth], async (req, res) => {
  try {     
      const userData = req.user;
      
      res.status(200).json({ user: userData.user });
  } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//Sign In Google
auth.post("/logingoogle", async (req, res) => { 
  console.log("Received request to /logingoogle"); // Log to see request

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    console.error("Error during Google login:", error.message); // Log error
    return res.status(400).json({ error: error.message });
  }

  console.log("Google OAuth login success. Data received:", data); // Log data
  if (!data?.session) {
    console.error("No session returned from Supabase");
    return res.status(400).json({ error: "No session returned" });
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(data.session.access_token);

  if (userError) {
    console.error("Error getting user data:", userError.message);
    return res.status(400).json({ error: userError.message });
  }

  console.log("Login successful! Returning response..."); // Log response
  res.status(200).json({
    success: true,
    message: "Login successful",
    user: userData.user, 
    session: data.session,
  });
});


export default auth;
