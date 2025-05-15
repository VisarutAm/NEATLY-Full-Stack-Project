import React, { useState } from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row md:justify-between md:items-start space-y-8 md:space-y-0">
       
        <div className="flex flex-col items-start">
          <a href="/" className="flex items-center mb-4">
            <img
              src={assets.logo_2}
              alt="Neatly Hotel Logo"
              className="h-10 mr-3"
            />
            <span className="text-lg font-bold">Neatly Hotel</span>
          </a>
          <p className="text-xs font-extralight">
            The best hotel for rising your experience
          </p>
        </div>

        
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>

          <div className="flex items-center">
            <img src={assets.tel_icon} alt="Tel" className="h-4 w-4 mr-2" />
            <p className="text-sm">080-540-XXXX</p>
          </div>

          <div className="flex items-center">
            <img src={assets.mail_icon} alt="Mail" className="h-4 w-4 mr-2" />
            <p className="text-sm">contact@homeservices.co</p>
          </div>

          <div className="flex items-start">
            <img
              src={assets.placeholder}
              alt="Location"
              className="h-4 w-4 mr-2 mt-1"
            />
            <p className="text-sm">
              188 Phaya Thai Rd, Thung Phaya Thai,
              <br />
              Ratchathewi, Bangkok 10400
            </p>
          </div>
        </div>
      </div>

      
      <div className="border-t border-white mt-8"></div>

    
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>Copyright © 2021 NeatlyHotel.com All rights reserved</p>
      </div>
    </footer>
  );
};


export default Footer;
