import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./Home/SignupPopup";
import userAuth from "../context/AuthContext";

const Navbar = () => {
  const { session, signOut } = userAuth();
  const [menu, setMenu] = useState("home");
  const [showSignup, setShowSignup] = useState(false);

  console.log(session?.user?.user_metadata?.picture)
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(); 
    navigate("/");
  };
  
  return (
    <>      
      <div className="navbar mr-5 z-50">
        <div className="navbar bg-base-100 shadow-sm ">
          <div className="navbar-start">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
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
            {!session?.user ? (
              <button
                className="btn text-sm mr-15 border-amber-500 border-3 hover:bg-amber-100 rounded-full"
                onClick={() => setShowSignup(true)}
              >
                Log In
              </button>
            ) : session?.user?.email === "admin@admin.com" ? (
              <div className="flex flex-row gap-6">
                <p className="p-1 text-2xl">
                  {session?.user?.user_metadata?.displayName}
                </p>
                <div className="navbar-profile relative group mr-15 border-amber-500 border-3 rounded-full">
                  <img
                    src={assets.panda}
                    alt=""
                    width={40}
                    className="rounded-full cursor-pointer"
                  />
                  <ul className="navbar-profile-dropdown absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-100 border-green-800 border-2">
                    <li
                      onClick={() => navigate("/booking")}
                      className="text-center font-medium"
                    >
                      <p>Booking</p>
                    </li>
                    <li
                      onClick={() => navigate("/admin")}
                      className="text-center font-medium"
                    >
                      <p>Admindashboard</p>
                    </li>
                    <hr />
                    <li
                      onClick={handleSignOut}
                      className="text-center font-medium"
                    >
                      <p>Logout</p>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-6">
                <p className="p-1 text-2xl">
                  {session?.user?.user_metadata?.displayName || session?.user?.user_metadata?.full_name}
                </p>
                <div className="navbar-profile relative group mr-15 border-amber-500 border-3 rounded-full">
                  <img
                    src={session?.user?.user_metadata?.picture || assets.panda}
                    alt=""
                    width={40}
                    className="rounded-full cursor-pointer"
                  />
                  <ul className="navbar-profile-dropdown absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-100 border-green-800 border-2 cursor-pointer">
                    <li
                      onClick={() => navigate("/booking")}
                      className="text-center font-medium"
                    >
                      <p>Booking</p>
                    </li>
                    <li
                      onClick={() =>
                        navigate(`/bookinghistory/${session?.user?.email}`)
                      }
                      className="text-center font-medium"
                    >
                      <p>Booking History</p>
                    </li>
                    <hr />
                    <li
                      onClick={handleSignOut}
                      className="text-center font-medium"
                    >
                      <p>Logout</p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <LoginModal isOpen={showSignup} onClose={() => setShowSignup(false)} />
      </div>
    </>
  );
};

export default Navbar;
