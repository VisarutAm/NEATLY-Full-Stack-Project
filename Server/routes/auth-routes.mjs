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
  
      // ✅ ตรวจสอบว่ามีค่าครบหรือไม่
      if (!email || !password || !displayName) {
        return res.status(400).json({ success: false, error: "Please fill in all required fields." });
      }
  
      // ✅ ทำการสมัครสมาชิก
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { displayName },
         
        },
      });
  
      // ✅ ตรวจสอบว่ามี error หรือไม่
      if (error) {
        console.error("Signup Error:", error.message);
        return res.status(400).json({ success: false, error: error.message });
      }
  
      // ✅ ถ้าสำเร็จ ให้ส่งข้อมูลกลับ
      console.log("Signup Success - Sending response:", { success: true, data }); // ✅ Debug
      res.status(201).json({ success: true, data });
    } catch (err) {
      console.error("Server Error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

// Sign in
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return res.status(400).json({ error: error.message });
//   }

//   res.status(200).json({
//     success: true,
//     message: "Login successful",
//     user: data.user,
//     session: data.session,
//   });
// });

// Sign in Admin  
auth.post("/login", async (req, res) => { 
  const { email, password } = req.body;

  // 🔐 ล็อกอิน
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // 🔍 ดึงข้อมูล User
  const { data: userData, error: userError } = await supabase.auth.getUser(data.session.access_token);

  if (userError) {
    return res.status(400).json({ error: userError.message });
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: userData.user, // ✅ ส่งข้อมูล User กลับไป
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

// Backend: ตรวจสอบ Route และให้บริการข้อมูลผู้ใช้
// auth.get("/user",[validationAuth],async (req, res) => {
//   // ดึง token จาก header
//   const token = req.headers.authorization?.split(" ")[1];  // Extract token from Authorization header

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized: No token provided" });
//   }

//   try {
//     // ใช้ Supabase เพื่อตรวจสอบ token และดึงข้อมูลผู้ใช้
//     const { data: userData, error } = await supabase.auth.getUser(token);

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     res.status(200).json({ user: userData.user });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
auth.get("/user", [validationAuth], async (req, res) => {
  try {
      // ข้อมูลผู้ใช้จะถูกเก็บใน req.user หลังจากผ่าน middleware validationAuth
      const userData = req.user;
      
      res.status(200).json({ user: userData.user });
  } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});



export default auth;
