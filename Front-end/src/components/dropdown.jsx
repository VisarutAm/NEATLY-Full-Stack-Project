import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  userAuth  from "../context/AuthContext";
import { assets } from "../assets/assets" // ตรวจสอบว่า assets.panda ถูกต้อง

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { signOut } = userAuth();

  // ✅ ปิด dropdown ถ้าคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 🔽 ปุ่มเปิด dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <img
          src={assets.panda}
          alt="Profile"
          width={40}
          className="rounded-full cursor-pointer"
        />
      </button>

      {/* ✅ Dropdown Menu */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
          <li
            onClick={() => {
              navigate("/dashboard");
              setIsOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Orders
          </li>
          <hr />
          <li
            onClick={() => {
              signOut();
              setIsOpen(false);
            }}
            className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
