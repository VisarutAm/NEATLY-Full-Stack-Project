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

// Log Out
auth.post("/logout", async (req, res) => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("There was an error:", error);
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ success: true, message: "Logout successful" });
});


auth.get("/user", [validationAuth], async (req, res) => {
  try {     
      const userData = req.user;
      
      res.status(200).json({ user: userData.user });
  } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});



export default auth;
