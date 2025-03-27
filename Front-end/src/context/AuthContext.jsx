import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUserInfo(token);
    }
  }, []);
   
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      //console.log("session:",session.access_token)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSession({
        token,
        user: response.data.user,
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Sign Up
  const signUpNewUser = async (email, password, displayName) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        {
          email,
          password,
          displayName,
        }
      );
      //console.log("Signup Response:", response.data);

      if (response.data?.success) {
        return { success: true, data: response.data.data };
      } else {
        return {
          success: false,
          error: response.data?.error || "Signup failed",
        };
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || "Signup failed",
      };
    }
  };

  // Sign In
  const signIn = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email,
          password,
        }
      );

      if (response.data?.error) {
        console.error("Sign-in error occurred: ", response.data.error);
        return { success: false, error: response.data.error.message };
      }

      const token = response.data.session.access_token;
      console.log("token:",token)
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUserInfo(token);

      return { success: true, data: response.data.data };
    } catch (error) {
      console.error(
        "An error occurred during sign-in: ",
        error.response?.data || error.message
      );
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

   // Sign Out  
  const signOut = async () => {
    try {
           const { error } = await supabase.auth.signOut();
  
      if (error) {
        throw new Error(error.message);
      }
  
      
      localStorage.removeItem("token");
  
      
      setSession(null);
  
     
      axios.defaults.headers.common["Authorization"] = "";
  
      console.log("User signed out successfully");
      return { success: true };
    } catch (error) {
      console.error("Error signing out:", error.message);
      return {
        success: false,
        error: error.message || "Logout failed",
      };
    }
  };
  

  // Sign In GooGle 
  const signInGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
  
      if (error) {
        console.error("Sign-in error occurred:", error.message);
        return { success: false, error: error.message };
      }
  
      //console.log("OAuth Login successful. Redirecting...");
       
      return { success: true };
    } catch (error) {
      console.error("An error occurred during sign-in:", error.message);
      return { success: false, error: error.message || "Login failed" };
    }
  };
  
  // 📌 ดึง session หลังจาก Login
  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error.message);
      return null;
    }
  
    if (data?.session) {
      console.log("Session found:", data.session);
      localStorage.setItem("token", data.session.access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.session.access_token}`;
      return data.session;
    } else {
      console.log("No session found.");
      return null;
    }
  };
  
  // 📌 ใช้ fetchSession() หลังจาก redirect
  useEffect(() => {
    fetchSession();
  }, []);
  
  

//console.log("session:",session)

  return (
    <AuthContext.Provider
      value={{ session, signIn, signOut, signUpNewUser, signInGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const userAuth = () => useContext(AuthContext);

export default userAuth;
