import { supabase } from "../utils/supabase-client.mjs";


export const validationAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // ดึง token จาก header
    if (!token) return res.status(401).json({ error: "No token provided" }); // หากไม่มี token ให้ส่ง 401

    try {
        // ใช้ Supabase เพื่อตรวจสอบ token และดึงข้อมูลผู้ใช้
        const { data: user, error } = await supabase.auth.getUser(token);

        if (error) return res.status(403).json({ error: "Invalid token" }); // หาก token ไม่ถูกต้อง ส่ง 403

        req.user = user; // เก็บข้อมูลผู้ใช้ใน req.user
        next(); // ให้ทำงานต่อไปใน route handler
    } catch (err) {
        console.error("Error in validationAuth:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


  export const verifyAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
  
    const { data: user, error } = await supabase.auth.getUser(token);
  console.log(user)
    if (error || !user || user.user.email !== "admin@admin.com") {
      return res.status(403).json({ error: "Forbidden: Admin access only" });
    }
  
    req.user = user.user;  // ส่งข้อมูล User ไปให้ API อื่นๆ ใช้ต่อ
    next();
  };
  