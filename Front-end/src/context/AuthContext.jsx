import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      getUserInfo(token);
    }
  }, []);

  const getUserInfo = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, {
        email,
        password,
        displayName,
      });  
      //console.log("Signup Response:", response.data);
      
      if (response.data?.success) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, error: response.data?.error || "Signup failed" };
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || "Signup failed" };
    }
  };

  // Sign In
  const signIn = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
        email,
        password,
      });
      
      if (response.data?.error) {
        console.error("Sign-in error occurred: ", response.data.error);
        return { success: false, error: response.data.error.message };
      }

      const token = response.data.session.access_token;
      localStorage.setItem("token", token); 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;       
      getUserInfo(token);

      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("An error occurred during sign-in: ", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || "Login failed" };
    }
  };
  
  // Sign Out
  const signOut = async () => {
    try {
      localStorage.removeItem("token");
      setSession(null);
      axios.defaults.headers.common['Authorization'] = '';
      return { success: true };
    } catch (error) {
      console.error("There was an error:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || "Logout failed" };
    }
  };

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, signUpNewUser}}>
      {children}
    </AuthContext.Provider>
  );
};

const userAuth = () => useContext(AuthContext);

export default userAuth;
