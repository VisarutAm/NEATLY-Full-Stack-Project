// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// // สร้าง Context
// const AuthContext = createContext();

// // Provider Component
// export const AuthProvider = ({ children }) => {
//   const [session, setSession] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(response => {
//         setSession(response.data); // ✅ อัพเดต session
//       })
//       .catch(error => {
//         console.error("Failed to fetch user data:", error);
//         setSession(null);
//         localStorage.removeItem("token"); // ❌ ลบ token ถ้าผิดพลาด
//       });
//     }
//   }, []);


//   //Sign Up
// const signUpNewUser = async (email, password, displayName) => {
//      try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, {
//         email,
//         password,
//         displayName,
//       });  
//       //console.log("Signup Response:", response.data);
  
//       // ตรวจสอบผลลัพธ์จาก API
//       if (response.data?.success) {
//         return { success: true, data: response.data.data };
//       } else {
//         return { success: false, error: response.data?.error || "Signup failed" };
//       }
//     } catch (error) {
//       console.error("Signup Error:", error.response?.data || error.message);
//       return { success: false, error: error.response?.data?.error || "Signup failed" };
//     }
//   };

//   //Sign In
//   const signIn = async (email, password) => {
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
//         email,
//         password,       
//       });

//       console.log("Sign-in Response:", response.data.session.access_token); 
  
//       // ตรวจสอบ error ที่อาจเกิดขึ้นจาก API
//       if (response.data?.error) {
//         console.error("Sign-in error occurred: ", response.data.error);
//         return { success: false, error: response.data.error.message };  // ส่ง error กลับ
//       }
  
//      // ถ้า sign in สำเร็จ
//     console.log("Sign-in Response:", response.data.session.access_token);

//     // 👉 บันทึก Token ใน localStorage
//     const token = response.data.session.access_token;
//     localStorage.setItem("token", token); // เก็บ Token ใน localStorage

//     // ✅ อัปเดต session ใน Context (อาจเก็บข้อมูลผู้ใช้ด้วย)
//     setSession(response.data.session);  // อัปเดต session ด้วยข้อมูลจาก response


//       return { success: true, data: response.data.data };  // ส่งข้อมูลผู้ใช้กลับ
//     } catch (error) {
//       // จัดการกับ error ถ้ามี
//       console.error("An error occurred during sign-in: ", error.response?.data || error.message);
//       return { success: false, error: error.response?.data?.error || "Login failed" };  // ส่ง error กลับ
//     }
//   };
  

// //Sign Out
// const signOut = async () => {
//   try {
//     await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`);
//     localStorage.removeItem("token"); // ❌ ลบ token
//     setSession(null); // ❌ เคลียร์ session
//     navigate("/"); // 🔄 กลับหน้าแรก
//     return { success: true };
//   } catch (error) {
//     console.error("There was an error:", error.response?.data || error.message);
//     return { success: false, error: error.response?.data?.error || "Logout failed" };
//   }
// };

  
//   return (
//     <AuthContext.Provider value={{session, signUpNewUser, signOut, signIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const userAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// สร้าง Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  // ดึง Token จาก localStorage และตั้งค่า session เมื่อแอปโหลด
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // ถ้ามี token ให้ตั้ง session
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //     // สมมติว่า response จาก API สามารถตรวจสอบได้จาก token
  //     setSession({ token });
  //   }
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // ดึงข้อมูลของผู้ใช้จาก API (หลังจากการล็อกอิน)
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
  
      // ตรวจสอบผลลัพธ์จาก API
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
      localStorage.setItem("token", token); // เก็บ Token ใน localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // ตั้งค่าหัว Authorization
      // setSession(response.data.session); // อัปเดต session ใน Context
      getUserInfo(token);// เรียกข้อมูลผู้ใช้หลังจากล็อกอิน

      return { success: true, data: response.data.data };
    } catch (error) {
      console.error("An error occurred during sign-in: ", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || "Login failed" };
    }
  };

  // Sign In Admin
  // const signInAdmin = async (email, password) => {
  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {
  //       email,
  //       password,
  //     });

  //     console.log(response.data.user.email)

  //     if (response.data?.error) {
  //       console.error("Sign-in error occurred: ", response.data.error);
  //       return { success: false, error: response.data.error.message };
  //     }

  //     const token = response.data.session.access_token;
  //     localStorage.setItem("token", token); // เก็บ Token ใน localStorage
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // ตั้งค่าหัว Authorization
  //     setSession(response.data.session); // อัปเดต session ใน Context

  //     return { success: true, data: response.data.data };
  //   } catch (error) {
  //     console.error("An error occurred during sign-in: ", error.response?.data || error.message);
  //     return { success: false, error: error.response?.data?.error || "Login failed" };
  //   }
  // };

  // Sign Out
  const signOut = async () => {
    try {
      localStorage.removeItem("token"); // ลบ Token ออกจาก localStorage
      setSession(null); // อัปเดต session
      axios.defaults.headers.common['Authorization'] = ''; // ลบ header Authorization
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
