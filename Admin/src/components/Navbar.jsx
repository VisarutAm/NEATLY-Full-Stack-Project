import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("home");

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
          <a className="btn text-sm mr-15">Log In</a>
        </div>
      </div>
          </div>
          <div className="background relative flex justify-center ">
          <img className="background absolute w-full h-screen px-8 z-0"src={assets.background} alt="Background"/>
           
          <p className="z-10 text-white  text-6xl w-auto  font-primary p-65 ">
        A Best Place for Your Neatly Experience
      </p>           
          </div> 
          
</>
  );
};

export default Navbar;
