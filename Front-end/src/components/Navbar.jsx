import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./SignupPopup";
import userAuth from "../context/AuthContext";


const Navbar = () => {
  const { session, signOut } = userAuth();

  // console.log("session",session)

  const [menu, setMenu] = useState("home");
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="navbar mr-5">
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
            <Link to="/">
              <img
                className="logo btn btn-ghost text-xl mx-15"
                src={assets.logo}
                alt="logo"
              />
            </Link>

            <div className="navbar-center hidden lg:flex ml-20">
              <ul className="menu menu-horizontal px-1 gap-5 text-base">
                <a
                  href="#about-neatly"
                  className={`${menu === "about-neatly" ? "active" : ""}`}
                  onClick={() => setMenu("about-neatly")}
                >
                  About Neatly
                </a>
                <a
                  href="#service"
                  className={`${menu === "service" ? "active" : ""}`}
                  onClick={() => setMenu("service")}
                >
                  Service & Facilities
                </a>
                <a
                  href="#room-suits"
                  className={`${menu === "room-suits" ? "active" : ""}`}
                  onClick={() => setMenu("room-suits")}
                >
                  Rooms & Suits
                </a>
              </ul>
            </div>
          </div>
          <div className="navbar-end">
            {!session ? (
              <button
                className="btn text-sm mr-15 border-amber-500 border-3 hover:bg-amber-100 rounded-full"
                onClick={() => setShowSignup(true)}
              >
                Log In
              </button>
            ) : (
              <div className="navbar-profile relative group mr-15  border-amber-500 border-3 rounded-full">
                <img
                  src={assets.panda}
                  alt=""
                  width={40}
                  className="rounded-full cursor-pointer"
                />
                <ul className="navbar-profile-dropdown absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-100 border-green-800 border-2">
                  <li onClick={() => navigate("/dashboard") } className="text-center font-medium">                    
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li onClick={signOut} className="text-center font-medium">                    
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <LoginModal isOpen={showSignup} onClose={() => setShowSignup(false)} />
      </div>
      <div className="background relative flex justify-center ">
        <img
          className="background absolute w-full h-screen px-8 z-0"
          src={assets.background}
          alt="Background"
        />

        <p className="z-10 text-white  text-6xl w-auto  font-primary p-65 ">
          A Best Place for Your Neatly Experience
        </p>
      </div>
    </>
  );
};

export default Navbar;
