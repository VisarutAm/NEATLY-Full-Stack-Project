import { supabase } from "../utils/supabase-client.mjs";

export const validationAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) return res.status(401).json({ error: "No token provided" }); 
    try {       
        const { data: user, error } = await supabase.auth.getUser(token);
        if (error) return res.status(403).json({ error: "Invalid token" }); 
        req.user = user; 
        next(); 
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
  //console.log(user)
    if (error || !user || user.user.email !== "admin@admin.com") {
      return res.status(403).json({ error: "Forbidden: Admin access only" });
    }
  
    req.user = user.user;  
    next();
  };
  